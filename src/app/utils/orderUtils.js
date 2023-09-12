import { statuses } from "../services/orderService"

export const translateStatus = status => {
    return statuses.find(s => s.value === status).translation
}