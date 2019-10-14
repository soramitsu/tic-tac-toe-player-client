// import { sendQuery } from 'iroha-helpers/lib/queries'
// import { addQuery, emptyQuery } from 'iroha-helpers/lib/queryHelper'
import { queries } from 'iroha-helpers'
import { newCustomQueryServiceOptions } from './util'

const getAccountDetail = (privateKey, creatorAccountId, {
  accountId,
  key,
  writer
}) => queries.getAccountDetail(
  newCustomQueryServiceOptions(privateKey, creatorAccountId), {
    accountId,
    key,
    writer
  }
)

// function getAccountDetailHelper (queryOptions, { accountId, key, writer, pageSize, paginationWriter, paginationKey }) {
//   return sendQuery(
//     queryOptions,
//     addQuery(
//       emptyQuery(),
//       'getAccountDetail',
//       {
//         accountId,
//         key,
//         writer,
//         paginationMeta: {
//           pageSize,
//           firstRecordId: {
//             writer: paginationWriter,
//             key: paginationKey
//           }
//         }
//       }
//     ),
//     (resolve, reject, responseName, response) => {
//       if (responseName !== 'ACCOUNT_DETAIL_RESPONSE') {
//         const error = JSON.stringify(response.toObject().errorResponse)
//         return reject(new Error(`Query response error: expected=ACCOUNT_DETAIL_RESPONSE, actual=${responseName}\nReason: ${error}`))
//       }

//       const transactions = JSON.parse(response.getAccountDetailResponse().toObject().detail)
//       resolve(transactions)
//     }
//   )
// }

export {
  getAccountDetail
}
