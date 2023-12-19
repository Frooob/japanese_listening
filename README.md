# Google tts


export GOOGLE_APPLICATION_CREDENTIALS=path/to/json.json"


## deploy
````
npm install
cd app/japapp/
npm run build
cp -r build /var/www/japapp 
systemctl restart nginx
systemctl restart japapp_api  # Is this necessary?
````

## Backend

Is built with FastAPI. To start the backend run the following command to start the server.

```bash
uvicorn main:app --reload
```

## Frontend

### Tasks
The app is about learning a language. For that I have a backend that provides pairs of japanese sentences, with their english translation and a japanese sound sample file (the file can be queried as mp3 from the backend). The Translations are sorted by different chapters. So for each chapters, there's multiple of those translations. 

Each translation is a json with the following keys:
{ id: uuid of the translation,
japanese: japanese text,
english: english translation,
chapter: name of the chapter of the translation}

Backend endpoints that you can use are the following:
/chapters (returns all chapter names)
/translations_chapter/{chapter} (returns all translations of a given chapter}
/random_translation/{chapter} (chapter is optional, would return a random  Translation. If chapter is given aswell, only Translations of the given chapter are considered)
/translation/{translation_id} (returns a single translation by id
/audio/{translation_id} (Returns a FileResponse with the corresponding MP3 of the translation)

So, for the first iteration I want to have a simple UI. 
it has a sidebar. In the sidebar There's three main entries:
- Home
- Learn
- Chapters

The chapters entry can be expanded and would then show all different chapters. 
Each chapter could be clicked to get the ChapterView.


Home:
Here is just a small welcome text. Nothing fancy. Make it a bit encouraging :)

Learn:
This is the main part of the app. First you can select, which chapter you want to learn (or if you don't care, you could also select multiple chapters or all of them).

Then you would query a random translation with the set constraints. 
First, you would give only the mp3 that the user could hear (make it a nice little player). It's a listening exercise.
Then, you have the option to reveal the correct sentence in japanese. Then you can reveal the english translation. 
You can always skip to the next Translation.
