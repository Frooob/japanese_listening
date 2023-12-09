from random import randrange
import pandas as pd


columns = ["Japanese", "English", "tts_file", "chapter"]

df_data = []
number_of_times = 40

# generate random times like 5:34 a.m.
for i in range(number_of_times):
    hour = randrange(1,12)
    minute = randrange(0,60)
    am_pm = randrange(2)
    am_pm = "a.m." if am_pm == 0 else "p.m."
    only_hour = randrange(5)
    half_past = randrange(8)
    if half_past == 0:
        minute = "30"
    if only_hour == 3:
        english_timestamp = f"{hour} {am_pm}"
    else:
        english_timestamp = f"{hour}:{minute} {am_pm}"

    df_data.append({"Japanese": "", "English": english_timestamp, "tts_file": "", "chapter": "time"})
    print(english_timestamp)

print(df_data)

df = pd.DataFrame(df_data, columns=columns)

df.to_csv("./input_sentences/times.csv", index=False)