// ----- 預設資料 -----
let data = [
  {
    chargeStationId: 16329839313,
    chargeStationType: '免費',
    chargeStationName: 'Tim',
  },
  {
    chargeStationId: 16329839314,
    chargeStationType: '投幣式',
    chargeStationName: 'Ray',
  },
  {
    chargeStationId: 16329839315,
    chargeStationType: '投幣式',
    chargeStationName: 'John',
  },
  {
    chargeStationId: 16329839316,
    chargeStationType: '免費',
    chargeStationName: 'Emily',
  },
  {
    chargeStationId: 16329839317,
    chargeStationType: '投幣式',
    chargeStationName: 'Mary',
  },
]

// ----- 變數 -----
let filterStatus = '全部'
let filterData = []
let filterTarget
const showFilterStatus = document.querySelector('.showFilterStatus')
const list = document.querySelector('.list')
const chargeStationName = document.querySelector('.chargeStationName')
const chargeStationKind = document.querySelector('.chargeStationKind')
const add = document.querySelector('.add')
const chargeStationFilter = document.querySelector('.filter')

// ----- 顯示當前 filter 狀態 -----
function updateFilterStatus(status) {
  showFilterStatus.textContent = `當前狀態 : ${status}`
}
// 初始狀態顯示
updateFilterStatus(filterStatus)

// ----- 產生 id 功能 -----
function generateId() {
  const dateTime = Date.now()
  const timestamp = Math.floor(dateTime / 100)
  return timestamp
}

// ----- 初始化渲染 -----
// 初始化過程
function render(data) {
  let renderData = ''
  data.forEach((item) => {
    let content = `
      <li>
        ${item['chargeStationName']}充電站，${item['chargeStationType']}
        <button class="delete" data-id="${item['chargeStationId']}">刪除</button>
      </li>
    `
    renderData += content
  })
  list.innerHTML = renderData
}
// 初始渲染
render(data)

// ----- 新增功能 -----
// 新增過程
function addHandler(e) {
  let dataObj = {}
  dataObj['chargeStationId'] = generateId()
  dataObj['chargeStationName'] = chargeStationName.value
  dataObj['chargeStationType'] = chargeStationKind.value
  data.push(dataObj)
  chargeStationName.value = ''
  // 新增後重新渲染
  render(data)
}
// 點擊新增
add.addEventListener('click', addHandler)

// ----- 篩選功能 -----
// 篩選過程
function filterHandler(e) {
  // 將 e 外包
  filterTarget = e
  filterStatus = e.target.value
  if (filterStatus == undefined) return
  if (filterStatus == '全部') {
    render(data)
  } else {
    filterData = data.filter(item => item['chargeStationType'] == filterStatus)
    render(filterData)
  }
  // 更新當前狀態顯示
  updateFilterStatus(filterStatus)
}
// 點擊篩選
chargeStationFilter.addEventListener('click', filterHandler)

// ----- 刪除功能 -----
function deleteHandler(e) {
  if (e.target.classList.contains('delete')) {
    let deleteTargetId = e.target.dataset.id
    // 找到與刪除按鈕的 data-id 匹配的 chargeStationId 物件所在 index
    let deleteIndex = data.findIndex(item => {
      return item['chargeStationId'] == deleteTargetId
    })
    data.splice(deleteIndex, 1)
    if (filterStatus == undefined) return
    if (filterStatus == '全部') {
      render(data)
    } else {
      filterHandler(filterTarget)
    }
  }
}
// 點擊刪除
list.addEventListener('click', deleteHandler, false)