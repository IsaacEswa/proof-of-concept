import express from 'express'
import { Liquid } from 'liquidjs';
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const engine = new Liquid();
app.engine('liquid', engine.express());
app.set('views', './views')

// Endpoints:
// https://fdnd-agency.directus.app/items/teylers_museum_exhibits/1 | Topstuk
// https://fdnd-agency.directus.app/items/teylers_museum_exhibits_sections | Timeline items
// https://fdnd-agency.directus.app/items/teylers_museum_persons | Creators

const baseURL = 'https://fdnd-agency.directus.app/items/teylers_museum_'
const timelineItem_fields = 'title, id, slug, exhibit, cover, content_block.*, start_year, end_year, era, summary'

app.get('/', async function (request, response) {
    const params = new URLSearchParams()
    params.set('fields', timelineItem_fields)
    // params.set('sort', '-date')

    const timelineDataResponse = await fetch(baseURL + 'exhibits_sections' + '?' + params.toString())
    const timelineDataResponseJSON = await timelineDataResponse.json()

    console.log(timelineDataResponseJSON)

    response.render('index.liquid', { timelineData: timelineDataResponseJSON.data })
})

app.use((req, res, next) => {
    res.status(404).send("Deze pagina bestaat niet")
})
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})