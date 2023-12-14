import os
from dotenv import load_dotenv
import pandas as pd

from fastapi import FastAPI
from fastapi.responses import FileResponse, Response
from pydantic import BaseModel
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

class Translation(BaseModel):
    id: str
    Japanese: str
    English: str
    tts_file: str
    chapter: str

main_df_path = os.getenv("MASTER_DF_PATH")
audio_samples_folder = os.getenv("AUDIO_SAMPLES_FOLDER")
main_df = pd.read_csv(main_df_path)
main_df["id"] = main_df["tts_file"].str.split("/").str[-1].str.split(".").str[0].str.split("_").str[-1]
main_df.index = main_df["id"]

df_records = main_df.to_dict(orient="records")
translations_dict = {record["id"]:Translation(**record) for record in df_records}

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/translation/{translation_id}")
def read_translation(translation_id: str):
    return translations_dict[translation_id]

# get all chapter names
@app.get("/chapters")
def read_chapters():
    return main_df["chapter"].unique().tolist()

# get all translations of a specific chapter
@app.get("/translations_chapter/{chapter}")
def read_translations_chapter(chapter: str):
    return [translation for translation in translations_dict.values() if translation.chapter == chapter]

# get random_translation
@app.get("/random_translation/{chapter}")
def read_random_translation(chapter: str = None):
    if chapter:
        return Translation(**main_df[main_df["chapter"] == chapter].sample().to_dict(orient="records")[0])
    else:
        return Translation(**main_df.sample().to_dict(orient="records")[0])

@app.get("/audio/{audio_id}")
def get_audio(audio_id: str):
    filename = f"out_{audio_id}.mp3"
    filepath = os.path.join(audio_samples_folder, filename)
    if os.path.exists(filepath):
        return FileResponse(filepath)
    else:
        return Response(status_code=404, content=f"Audio file {audio_id} not found")