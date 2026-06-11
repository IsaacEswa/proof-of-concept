import express from 'express'
import { Liquid } from 'liquidjs';
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
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

const baseURL = 'https://fdnd-agency.directus.app/items/'
const sectionsURL = 'teylers_museum_exhibits_sections'
const questionsURL = 'teylers_museum_quiz_questions'

app.get('/', async function (request, response) {
    const { answered, correct, step } = request.query

    const sectionParams = new URLSearchParams()
    sectionParams.set(
        'fields',
        '*,questions.*,questions.options.*'
    )

    const sectionsResponse = await fetch(
        baseURL + sectionsURL + '?' + sectionParams.toString()
    )

    const sectionsJSON = await sectionsResponse.json()

    const sections = {
        sections: sectionsJSON.data,
        step: Number(step ?? 0),
        answered,
        correct,
    }

    response.render('index.liquid', sections)
})

app.post('/quiz/answer', async (request, response) => {
    const { questionId, answerKey, step } = request.body

    const questionParams = new URLSearchParams()
    questionParams.set('fields', '*,options.*')

    const questionResponse = await fetch(
        baseURL + questionsURL + '/' + questionId + '?' + questionParams.toString()
        // BIJV: https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions/1?fields=*,options.*
    )

    const questionJSON = await questionResponse.json()

    const selectedOption = questionJSON.data.options.find(
        option => option.key === answerKey
    )

    const isCorrect = selectedOption?.is_correct === true

    await fetch(baseURL + 'quiz_answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            attempt: 2, // tijdelijk hardcoded
            question: questionId,
            chosen_option: answerKey,
            is_correct: isCorrect,
            answered_at: new Date().toISOString(),
        })
    })

    response.redirect(
        '/?step=' + (Number(step) + 1) + '&answered=' + questionId + '&correct=' + isCorrect
    )
})




app.use((req, res, next) => {
    res.status(404).send("Deze pagina bestaat niet")
})
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})