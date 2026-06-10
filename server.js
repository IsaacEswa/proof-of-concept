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

const baseURL = 'https://fdnd-agency.directus.app/items/teylers_museum_'
// const timelineItem_fields = 'title, id, slug, exhibit, cover.*, content_blocks, start_year, end_year, era, summary'

app.get('/', async function (request, response) {
    const answered = request.query.answered
    const correct = request.query.correct

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
    // console.dir(sectionsJSON, { depth: null })
    // console.log(request.query)

    const sections = {
        sections: sectionsJSON.data,
        answered: request.query.answered,
        correct: request.query.correct,
    }

    response.render('index.liquid', sections)
})

app.post('/quiz/answer', async (request, response) => {
    // console.log('POST /quiz/answer hit!')
    // console.log(request.body)


    const { questionId, answerKey } = request.body

    // 2.1 haal vraag opnieuw op
    const questionResponse = await fetch(
        `${baseURL}quiz_questions/${questionId}?fields=*,options.*`
        // BIJV: https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions/1?fields=*,options.*
    )

    const questionJSON = await questionResponse.json()

    // check antwoord
    const selectedOption = questionJSON.data.options.find(
        option => option.key === answerKey
    )

    const isCorrect = selectedOption?.is_correct === true

    // console.log({
    //     questionId,
    //     answerKey,
    //     isCorrect
    // })


    // 2.2 fetchen en posten
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

    // console.log(request.body)




    // 2.3 redirect terug
    response.redirect(
        '/?answered=' + questionId + '&correct=' + isCorrect
    )

    // console.log(request.query)

})




app.use((req, res, next) => {
    res.status(404).send("Deze pagina bestaat niet")
})
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`)
})