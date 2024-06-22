import { Router } from "express"
import { AuthRoute } from "../../modules/auth/auth.route"
import { UserRoute } from "../../modules/user/user.route"
import { BikeRoute } from "../../modules/bike/bike.route"
import { BookingRoute } from "../../modules/booking/booking.route"


const router = Router()
const routeModule =[
    {
        path:'/auth',
        route:AuthRoute
    },
    {
        path:'/users',
        route:UserRoute
    },
    {
        path:'/bikes',
        route:BikeRoute
    },
    {
        path:'/rentals',
        route:BookingRoute
    },
]

routeModule.forEach((route)=>router.use(route.path,route.route))
export default router