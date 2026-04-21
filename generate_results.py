# =========================================================
# FIX 1: CLEAN DATE FORMAT (KEEP AS DATETIME, NOT .date)
# =========================================================
df['Adm_Date'] = pd.to_datetime(df['Adm. Date/Time'], errors='coerce')

# -----------------------------
# LOS PREPARATION
# -----------------------------
daily_los = df.groupby('Adm_Date')['LOS'].mean().reset_index()

min_date = daily_los['Adm_Date'].min()
max_date = daily_los['Adm_Date'].max()

date_range = pd.date_range(start=min_date, end=max_date, freq='D')

daily_los = daily_los.set_index('Adm_Date').reindex(date_range).ffill().reset_index()
daily_los = daily_los.rename(columns={'index': 'Adm_Date'})

# -----------------------------
# LOS CHART (FIXED + LABELS)
# -----------------------------
plt.figure(figsize=(14, 7))
plt.plot(daily_los['Adm_Date'], daily_los['LOS'], marker='o')

for x, y in zip(daily_los['Adm_Date'], daily_los['LOS']):
    plt.text(x, y, f"{y:.1f}", fontsize=7)

plt.title('Daily Average LOS')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig("outputs/los_chart.png")
plt.close()
