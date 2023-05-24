# Wildhunt map service

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Build app

```
npm run build
```

### Start the server in production mode

```
npm run start
```

### Run docker compose (so far only production mode)
```
docker-compose -f docker-compose.yml up -d
```

### API
> #### POST method: 
> To successfully upload files, the following validation rules must be observed:
> 1. Parameter for the file should be - **chunk**;
> 2. File name must match the regex rule - `/^[ -]?(\d{1,19})$/`
> 3. Mimetype must be only - **.png**
> 4. File size must not exceed - **12 kilobytes**

```
POST https://map.minecraft-wildhunt.com/api/v1/chunks/

Content-Type: multipart/form-data;

Content-Disposition: form-data; name="chunk"; filename="1.png"

Content-Type: image/png
```

> #### GET method:
> In order to get a chunk image, you just need to specify the name of the required chunk, and also meet the following conditions:
> 1. Chunk name must match the regular expression - `/^[ -]?(\d{1,20})\.(png)$/`
```
GET https://map.minecraft-wildhunt.com/api/v1/chunks/1.png
```

> #### Notice:
> If the file was not found in the public directory, a "stub image" will be returned.
