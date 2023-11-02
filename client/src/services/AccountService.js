import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Ticket } from '../models/Ticket'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async getMyTickets() {
    const res = await api.get('/account/tickets')
    AppState.myTickets = res.data.map((ticket) => new Ticket(ticket))
    logger.log(`This is the my ticket func:`, AppState.myTickets)
  }
}

export const accountService = new AccountService()
