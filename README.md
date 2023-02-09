# Specs for NASA Media Library

Clickup Task List ([LIST  LINK](https://app.clickup.com/26481283/v/l/t84m3-2368))

Repo: ([GITHUB REPO](https://github.com/jakwakwa/startupz-nasa-testcase))

<hr><br>




NASA has revealed a public API for the image collection. We would like to explore the content using the client-side application.

<br>

## API docs:
============



- [PDF](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)

- NASA IMAGES API DOCUMENTATION ([CLICK UP DOC](https://share-docs.clickup.com/d/h/t84m3-2388/a60f7d9ad82be34/t84m3-408))

<br>

## Requirements:
===============



- Create a React single page application (it’s ok to use CRA).
- The application should consist of 2 pages: search and show (requirements below).
- Make sure the application i s usable on mobile devices as well.
- Provide basic tests for your code.
- Feel free to style your application as you l ike.
- You can use any l ibraries you l ike.
<br><br>

### Search page requirements:
=======================


- The page must allow users to search the NASA Media Library.
- The search process must use the / search endpoint (API docs).
- The page should contain the required query i nput and 2 optional i nput filters: year start
and year end.
- The i nput data should have basic validations compliant with the API specification.
- There should be a search button that starts the search process.
- The search results should appear below the search section (inputs).
- Each search result i tem should i nclude a thumbnail, title, l ocation, and photographer's
name.
- The search result i tem should l ink to the show page - the more detailed page of a
specific search result i tem.
- Only search i mage collections (m edia_type=image) .

<br>


### Show page requirements:
======================


- The page should contain the details of the collection: title, l ocation, photographer's
name, description, keywords, date, and i mages from the collection.
- Choose unique i mages from the collection, regardless of version. Most collections only
have one i mage. Decide which version suits your preferences.
- There should be a back button that takes you back to the search results page.
<br>
<br>
<br>
<hr>

# NASA IMAGES API DOCUMENTATION



## API Reference
===============



The `images.nasa.gov` API is organized around REST. Our API has predictable, resource­-oriented URLs, and uses HTTP response codes to indicate API errors. We use built­in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off ­the­ shelf HTTP clients. We support cross­-origin resource sharing, allowing you to interact securely with our API from a client­ side web application. JSON is returned by all API responses, including errors.





Each of the endpoints described below also contains example snippets which use the curl command­-line tool, Unix pipelines, and the python command ­line tool to output API responses in an easy­-to-read format. We insert superfluous newlines to improve readability in these inline examples, but to run our examples you must remove these newlines.

<br><br>

### API Root:



`https://images-api.nasa.gov`
<br><br>


### API Endpoints:



```plain
/search
/asset/{nasa_id}
/metadata/{nasa_id}
/captions/{nasa_id}
/album/{album_name}
```

<br>


## Errors
------



The images ­api [nasa.gov](http://nasa.gov) uses conventional HTTP response codes to indicate the success or failure of an API request. In general, codes in the 2xx range indicate success, codes in the 4xx range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a search failed, etc.), and codes in the 5xx range indicate an error with our API servers (these are rare). Most error responses contain a reason attribute, a human­ readable message providing more details about the error.

<br><br>



### HTTP status code summary:
<br>

| Code | Explanation |
| ---| --- |
| _200 ­ OK_ | _Everything worked as expected._ |
| _400 ­ Bad Request_ | _The request was unacceptable, often due to missing a required parameter._ |
| _404 ­ Not Found_ | _The requested resource doesn’t exist._ |
| _500, 502, 503, 504 ­ Server Errors_ | _Something went wrong on the API’s end. (These are rare.)_ |

<br><br>

### Handling errors:

<br>

Our API returns HTTP error responses for many reasons, such as a failed search query, invalid parameters, a query for a non­ existent media asset, and network unavailability. We recommend writing code that gracefully handles all possible HTTP status codes our API returns.

<br><br>



## Performing a search
-------------------

<br>

`GET /search?q={q}`

<br>

### Parameters
<br>


| Name | Type | Description |
| ---| ---| --- |
| _q (optional)_ | _string_ | _Free text search terms to compare to all indexed metadata._ |
| _center (optional)_ | _string_ | _NASA center which published the media._ |
| _description (optional)_ | _string_ | _Terms to search fo r in “Description” fields._ |
| _description\_508 (optional)_ | _string_ | _Terms to search fo r in “508 Description” fields._ |
| _keywords (optional)_ | _string_ | _Terms to search fo r in “Keywords” fields. Separate multiple values with commas._ |
| _lo cation (optional)_ | _string_ | _Terms to search fo r in “Location” fields._ |
| _media\_type (optional)_ | _string_ | _Media types to restrict the search to . Available types: \[“image”, “audio”\]. Separate multiple values with commas._ |
| _nasa\_id (optional)_ | _string_ | _The media asset’s NASA ID._ |
| _page (optional)_ | _integer_ | _Page number, starting at 1, o f results to get._ |
| _photographer (optional)_ | _string_ | _The primary photographer’s name._ |
| _secondary\_creator (optional)_ | _string_ | _A secondary photographer/videographer’s name._ |
| _title (optional)_ | _string_ | _Terms to search for in “Title” fields._ |
| _year\_start (optional)_ | _string_ | _The start year for results. Format: YYYY._ |
| _year\_end (optional)_ | _string_ | _The end year for results. Format: YYYY._ |

<br><br>

### Example Request:
<br>


_At least one parameter is required, but all individual parameters are optional. All parameter values must be URL ­encoded. Most HTTP client libraries will take care o f this fo r you. Use_ `--data-urlencode` _to encode values using curl:_

<br>

```plain
curl -G https://images-api.nasa.gov/search
--data-urlencode "q=apollo 11"
--data-urlencode "description=moon landing"
--data-urlencode "media_type=image" | python -m json.tool
```
<br>


The equivalent pre­-encoded request looks more typical:

<br>

```plain
curl "https://images-api.nasa.gov/search
?q=apollo%2011 &description=moon%20landing &media_type=image" |
python -m json.tool
```
<br>


### Example Response:

<br>

Search results will come in the form of [Collection+JSON](https://github.com/collection-json/spec), which contains results and information about how to retrieve more details about each result:
<br>


```json
{
    "collection": {
        "href": "https://images-api.nasa.gov/search?q=apollo%2011...",
        "items": [
            {
                "data": [
                    {
                        "center": "JSC",
                        "date_created": "1969-07-21T00:00:00Z",
                        "description": "AS11-40-5874 (20 July 1969) --- Astronaut Edwin E. Aldrin Jr., lunar module pilot of the first lunar landing mission, poses for a photograph beside the deployed United States flag during Apollo 11 extravehicular activity (EVA) on the lunar surface. The Lunar Module (LM) is on the left, and the footprints of the astronauts are clearly visible in the soil of the moon. Astronaut Neil A. Armstrong, commander, took this picture with a 70mm Hasselblad lunar surface camera. While astronauts Armstrong and Aldrin descended in the LM the \"Eagle\" to explore the Sea of Tranquility region of the moon, astronaut Michael Collins, command module pilot, remained with the Command and Service Modules (CSM) \"Columbia\" in lunar orbit.",
                        "keywords": [
                            "APOLLO 11 FLIGHT",
                            "MOON",
                            "LUNAR SURFACE",
                            "LUNAR BASES",
                            "LUNAR MODULE",
                            "ASTRONAUTS",
                            "EXTRAVEHICULAR ACIVITY"
                        ],
                        "media_type": "image",
                        "nasa_id": "as11-40-5874",
                        "title": "Apollo 11 Mission image - Astronaut Edwin Aldrin poses beside th"
                    }
                ],
                "href": "https://images-assets.nasa.gov/image/as11-40-5874/collection.json",
                "links": [
                    {
                        "href": "https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~thumb.jpg 'rel': 'preview','render': 'image'"
                    }
                ]
            }
        ],
        "links": [
            {
                "href": "https://images-api.nasa.gov/search?q=apollo+11...&page=2",
                "prompt": "Next",
                "rel": "next"
            }
        ],
        "metadata": {
            "total_hits": 336
        },
        "version": "1.0"
    }
}
```



## Retrieving a media asset’s manifest
-----------------------------------
<br>

`GET /asset/{nasa_id}`

<br>

#### Parameters:
<br>

| Name | Type | Description |
| ---| ---| --- |
| _nasa\_id_ | _string_ | _The media asset’s NASA ID._ |

<br>


#### Example Request:

<br>

```plain
curl https://images-api.nasa.gov/asset/as11-40-5874 | python -m json.tool
```
<br>


#### Example Response:

<br>

Asset manifest results will come in the form of Collection+JSON:

<br>

```json
{
    "collection": {
        "href": "https://images-api.nasa.gov/asset/as11-40-5874",
        "items": [
            {
                "href": "https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~orig.jpg"
            },
            {
                "href": "https://images-assets.nasa.gov/image/as11-40-5874/as11‐40‐5874~medium.jpg"
            },
            {
                "href": "https://images-assets.nasa.gov/image/as11-40-5874/as11‐40‐5874~small.jpg"
            },
            {
                "href": "https://images-assets.nasa.gov/image/as11-40-5874/as11‐40‐5874~thumb.jpg"
            },
            {
                "href": "https://images-assets.nasa.gov/image/as11-40-5874/metadata.json"
            }
        ],
        "version": "1.0"
    }
}
```
<br><br>


## Retrieving a media asset’s metadata location
-------------------
<br>

`GET /metadata/{nasa_id}`

<br><br>

#### Parameters:

<br><br>

| Name | Type | Description |
| ---| ---| --- |
| _nasa\_id_ | _string_ | _The media asset’s NASA ID._ |

<br>

#### Example Request:

<br>

```plain
curl https://images-api.nasa.gov/metadata/as11-40-5874 | python -m json.tool
```

<br>

#### Example Response:
<br>

```json
{
"location": "https://images-assets.nasa.gov/image/as11-40-5874/metadata.json"
}
```
<br>


Download the JSON file at the location in the response to see the asset’s metadata.

<br>


## Retrieving a video asset’s captions location
-------------------

<br>

`GET /captions/{nasa_id}`
<br><br>


#### Parameters:

<br><br>

| Name | Type | Description |
| ---| ---| --- |
| _nasa\_id_ | _string_ | _The video asset’s NASA ID._ |

<br>
<br>

#### Example Request:


```plain
curl https://images-api.nasa.gov/captions/172_ISS-Slosh | python -m json.tool
```

<br>

#### Example Response:

<br>

```json
{
    "location": "https://images-assets.nasa.gov/video/172_ISS-Slosh/172_ISS-Slosh.srt"
}
```
<br>


Download the VTT or SRT file at the location in the response to see the video’s captions.

<br><br>



## Retrieving a media album’s contents
-------------------
<br>

`GET /album/album_name`


<br><br>


#### Parameters:

<br>

| Name | Type | Description |
| ---| ---| --- |
| _album\_name_ | _string_ | _The media album’s name (case­sensitive)._ |
| _page (optional)_ | _integer_ | _Page number, starting at 1, o f results to get._ |
<br>

#### Example Request:
<br>


```plain
curl https://images-api.nasa.gov/album/apollo | python -m json.tool
```
<br>


#### Example Response:

<br>

Like search results, album contents will come in the form of Collection + JSON, which contains results and information about how to retrieve more details about each member:

<br>

```json
{
    "collection": {
        "href": "https://images-api.nasa.gov/album/apollo",
        "items": [
            {
                "data": [
                    {
                        "nasa_id": "GSFC_20171102_Archive_e000579",
                        "album": [
                            "apollo"
                        ],
                        "keywords": [
                            "NASA",
                            "GSFC",
                            "Space Technology Demo at NASA Wallops"
                        ],
                        "title": "Space Technology Demo at NASA Wallops",
                        "media_type": "image",
                        "date_created": "2017-11-06T00:00:00Z",
                        "center": "GSFC",
                        "description": "A Black Brant IX suborbital sounding rocket is launched at 7:
                    }
                ],
                "href": "https://images-assets.nasa.gov/image/GSFC_20171102_Archive_e000579/colle "links": [{"href": "https: //images-assets.nasa.gov/image/GSFC_20171102_Archive_e0005 "rel": "preview","render": "image"
            }
        ]
    },
    ...*99 more objects omitted*...
],
"links": [
    {
        "href": "https...",
        "rel": "next"
    }
],
"metadata": {
    "total_hits": 302
},
"version": "1.0"
}
```