import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

/**
 * 处理静态资产的请求
 */
async function handleRequest(event) {
  try {
    // 从KV存储获取静态资产
    return await getAssetFromKV(event)
  } catch (e) {
    // 如果资产不存在，返回404页面
    return new Response(`页面不存在: ${event.request.url}`, {
      status: 404,
      statusText: 'Not Found'
    })
  }
}

/**
 * 响应请求事件
 */
addEventListener('fetch', event => {
  try {
    event.respondWith(handleRequest(event))
  } catch (e) {
    // 处理错误
    event.respondWith(new Response('发生错误', { status: 500 }))
  }
}) 