// import { sendQuery } from 'iroha-helpers/lib/queries'
// import { addQuery, emptyQuery } from 'iroha-helpers/lib/queryHelper'
import { queries } from 'iroha-helpers'
import { newCustomQueryServiceOptions } from './util'

const getAccountDetail = (privateKey, creatorAccountId, {
  accountId,
  key,
  writerId
}) => queries.getAccountDetail(
  newCustomQueryServiceOptions(privateKey, creatorAccountId), {
    accountId,
    key,
    writerId
  }
)

export {
  getAccountDetail
}
