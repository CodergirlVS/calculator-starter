import { setupWorker, rest } from 'msw'

interface Response {
result : string
}
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
    rest.get<Response>('/api/calculate/:operation/:first/:second', (req, res, ctx) => {
        console.log("REQ: in handler", req.params)
        return res(
          ctx.status(200),
          ctx.json({
           result: '3'
          }),
        )
      })
)