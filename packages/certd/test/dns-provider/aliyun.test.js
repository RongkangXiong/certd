import pkg from 'chai'
import AliyunDnsProvider from '../../src/dns-provider/impl/aliyun.js'
import { createOptions } from '../../../../test/options.js'
import { Certd } from '../../src/index.js'
const { expect } = pkg
describe('AliyunDnsProvider', function () {
  it('#getDomainList', async function () {
    const options = createOptions()
    const aliyunDnsProvider = new AliyunDnsProvider(options.accessProviders.aliyun)
    const domainList = await aliyunDnsProvider.getDomainList()
    console.log('domainList', domainList)
    expect(domainList.length).gt(0)
  })

  it('#getRecords', async function () {
    const options = createOptions()
    const aliyunDnsProvider = new AliyunDnsProvider(options.accessProviders.aliyun)
    const recordList = await aliyunDnsProvider.getRecords('docmirror.cn', '*')
    console.log('recordList', recordList)
    expect(recordList.length).gt(0)
  })

  it('#createAndRemoveRecord', async function () {
    const options = createOptions()
    const aliyunDnsProvider = new AliyunDnsProvider(options.accessProviders.aliyun)
    const record = await aliyunDnsProvider.createRecord({ fullRecord: '___certd___.__test__.docmirror.cn', type: 'TXT', value: 'aaaa' })
    console.log('recordId', record)
    expect(record != null).ok

    const recordId = await aliyunDnsProvider.removeRecord({ fullRecord: '___certd___.__test__.docmirror.cn', type: 'TXT', value: 'aaaa', record })
    console.log('recordId', recordId)
    expect(recordId != null).ok
  })

  it('#申请证书-aliyun', async function () {
    this.timeout(300000)
    const options = createOptions()
    options.args = { forceCert: true, test: false }
    const certd = new Certd(options)
    const cert = await certd.certApply()
    expect(cert).ok
    expect(cert.crt).ok
    expect(cert.key).ok
    expect(cert.detail).ok
    expect(cert.expires).ok
  })
})
