"""Synthesizes speech from the input string of text or ssml.
Make sure to be working in a virtual environment.

Note: ssml must be well-formed according to:
    https://www.w3.org/TR/speech-synthesis/
"""
from google.cloud import texttospeech
import random
# load the credentials json into the corresponding environment variable
import os


import uuid
uuid.uuid4().hex

def tts(text:str, out_folder="./samples"):
    id = uuid.uuid4().hex
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./secrets/vaulted-bus-406720-44b03c9092c5.json"

    client = texttospeech.TextToSpeechClient()

    synthesis_input = texttospeech.SynthesisInput(text=text)
    japanese_voices = client.list_voices(language_code="ja-JP").voices
    japanese_voices = [voice.name for voice in japanese_voices if "Wave" in voice.name]

    voice_name = random.choice(japanese_voices)
    voice = texttospeech.VoiceSelectionParams(
        language_code="ja-JP", name=voice_name)

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3)

    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )
    outfile = os.path.join(out_folder, f"out_{id}.mp3")
    with open(outfile, "wb") as out:
        out.write(response.audio_content)
        print(f'Audio content for sentence {text} written to file {outfile}')
    return outfile

def tts_dialog(dialog_text: str, out_folder="./samples"):
    dialog_lines = dialog_text.split("￥")
    print("---".join(dialog_lines))


