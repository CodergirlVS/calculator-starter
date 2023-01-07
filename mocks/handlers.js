//mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
    rest.get('/api/calculate/add/1/2', (req, res, ctx) => {
        console.log("REQ: in handler", req)
        return res(
          ctx.status(200),
          ctx.json({
           result: '3'
          }),
        )
      })
  ]