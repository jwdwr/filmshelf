
# filmshelf

a service for managing your movie collection

## API

### Films

#### Add film

*Endpoint*:
`POST /film/add`

*Request body:*
`{
  title: string,
  year: number,
  length?: number,
  format?: string,
  rating?: number
}`

*Response:* The film you added

#### Get film info

*Endpoint:*
`GET /film/get/:id`

*Params:*
`id: string`

*Response:* Info about a film in the list

#### Edit film

*Endpoint:* `PUT /film/edit/:id`

*Params:* `id: string`

*Request body:*
`{
  title?: string,
  year?: number,
  length?: number,
  format?: string,
  rating?: number
}`

*Response:* The updated film info

#### Delete film

*Endpoint:* `DELETE /film/delete/:id`

*Params:* `id: string`

*Response:* Deletion success

#### List films

*Endpoint:* `GET /film/list`

*Query params:*

`sortBy: 'title' | 'year' | 'length' | 'format' | 'rating'`

`sortDir: 'asc' | 'desc'`

*Response:* List of films in collection

### OMDB

#### Search

*Endpoint:* `GET /omdb/search`

*Query params:* `title: string, year?: number, page?: number`

*Response:* OMDB search results

#### Info

*Endpoint:* `GET /omdb/info/:id`

*Params:* `id: string`

*Response:* OMDB film info

#### Add to collection from OMDB

*Endpoint:* `POST /omdb/add/:id`

*Params:* `id: string`

*Response:* The film you added

### User

#### Sign up

*Endpoint:* `POST /user/signup`

*Post body:* `username: string, password: string`

*Response:* Your user info and an access token

#### Get token

*Endpoint:* `POST /user/token`

*Post body:* `username: string, password: string`

*Response:* Access token
