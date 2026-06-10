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

// https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions | Quiz questions
// https://fdnd-agency.directus.app/items/teylers_museum_quiz_attempts | Quiz attemps
// https://fdnd-agency.directus.app/items/teylers_museum_quiz_answers| Quiz answers

const baseURL = 'https://fdnd-agency.directus.app/items/teylers_museum_'
const timelineItem_fields = 'title, id, slug, exhibit, cover.*, content_blocks, start_year, end_year, era, summary'


// app.get('/', async function (request, response) {
//     const timelineParams = new URLSearchParams()
//     timelineParams.set('fields', timelineItem_fields)
//     timelineParams.set('sort', 'start_year')

//     const timelineDataResponse = await fetch(baseURL + 'exhibits_sections' + '?' + timelineParams.toString())
//     const timelineDataResponseJSON = await timelineDataResponse.json()

//     const quizParams = new URLSearchParams()
//     // quizParams.set('sort', 'id')
//     const quizQuestionsResponse = await fetch(baseURL + 'quiz_questions' + '?' + quizParams.toString())
//     const quizQuestionsResponseJSON = await quizQuestionsResponse.json()

//     console.log(quizQuestionsResponseJSON)

//     response.render('index.liquid', {
//         timelineItems: timelineDataResponseJSON.data,
//         quizQuestions: quizQuestionsResponseJSON.data
//     })
// })

app.get('/', async function (request, response) {
    const sectionParams = new URLSearchParams()
    sectionParams.set(
        'fields',
        '*,questions.*,questions.options.*'
    )

    const sectionsResponse = await fetch(
        baseURL + 'exhibits_sections?' + sectionParams.toString()
    )

    const sectionsJSON = await sectionsResponse.json()

    // console.log(sectionsJSON)
    console.dir(sectionsJSON, { depth: null })

    response.render('index.liquid', {
        sections: sectionsJSON.data
    })
})

app.post('/', async function (request, response) {
    await fetch(baseURL + 'quiz_answers', {
        method: 'POST',

        body: JSON.stringify({

        }),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });
    response.redirect(303, '/');
})


app.use((req, res, next) => {
    res.status(404).send("Deze pagina bestaat niet")
})
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})