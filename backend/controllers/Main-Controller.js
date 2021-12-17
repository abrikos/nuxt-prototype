
export default function MainController(app) {
    app.get('/api', (req, res) => {
        res.send({ok: 200})
    })
}
