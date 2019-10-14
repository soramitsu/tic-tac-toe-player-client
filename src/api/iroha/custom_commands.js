import {
  commands
} from 'iroha-helpers'

import {
  newCustomCommandServiceOptions
} from './util'

const transferAsset = (privateKeys, creatorAccountId, quorum, {
  srcAccountId,
  destAccountId,
  assetId,
  description,
  amount
}) => commands.transferAsset(
  newCustomCommandServiceOptions(privateKeys, creatorAccountId, quorum), {
    srcAccountId,
    destAccountId,
    assetId,
    description,
    amount
  }
)

const setAccountDetail = (privateKeys, creatorAccountId, quorum, {
  accountId,
  key,
  value
}) => commands.setAccountDetail(
  newCustomCommandServiceOptions(privateKeys, creatorAccountId, quorum), {
    accountId,
    key,
    value
  }
)

export {
  transferAsset,
  setAccountDetail
}
