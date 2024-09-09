import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Row, Col, Input, Select } from 'antd';
import fields from './assets/fields.json';

console.log(fields);
let cc_columns = [
  {
    key: 'id',
    dataIndex: 'id',
    title: 'ID',
    readonly: true,
  },
];

const getDealById = async (id: number, props: any[]) =>
  await axios.get(process.env.BX_WEBHOOK_URL + 'crm.deal.get', {
    params: {
      ID: id,
    },
  });

let entity = {
  ID: '79587',
  TITLE: 'Мебельная 49/92-658',
  TYPE_ID: null,
  STAGE_ID: 'PREPARATION',
  // "PROBABILITY": null,
  // "CURRENCY_ID": "RUB",
  // "OPPORTUNITY": null,
  // "IS_MANUAL_OPPORTUNITY": "N",
  // "TAX_VALUE": null,
  // "LEAD_ID": null,
  COMPANY_ID: '0',
  CONTACT_ID: '72399',
  // "QUOTE_ID": null,
  BEGINDATE: '2024-09-03T03:00:00+03:00',
  CLOSEDATE: '2024-09-13T03:00:00+03:00',
  ASSIGNED_BY_ID: '13',
  CREATED_BY_ID: '7',
  MODIFY_BY_ID: '1',
  DATE_CREATE: '2024-09-03T12:02:04+03:00',
  DATE_MODIFY: '2024-09-06T17:28:39+03:00',
  OPENED: 'N',
  CLOSED: 'N',
  COMMENTS: 'пэс//800*?ипу но, смс',
  ADDITIONAL_INFO: null,
  LOCATION_ID: null,
  // "CATEGORY_ID": "0",
  // "STAGE_SEMANTIC_ID": "P",
  IS_NEW: 'N',
  IS_RECURRING: 'N',
  IS_RETURN_CUSTOMER: 'N',
  IS_REPEATED_APPROACH: 'N',
  SOURCE_ID: 'UC_92N6SO',
  SOURCE_DESCRIPTION: null,
  ORIGINATOR_ID: null,
  ORIGIN_ID: null,
  MOVED_BY_ID: '91',
  MOVED_TIME: '2024-09-03T12:05:23+03:00',
  LAST_ACTIVITY_TIME: '2024-09-06T17:28:39+03:00',
  UTM_SOURCE: null,
  UTM_MEDIUM: null,
  UTM_CAMPAIGN: null,
  UTM_CONTENT: null,
  UTM_TERM: null,
  LAST_ACTIVITY_BY: '1',
};

let cc_deal_fields = [
  'номер',
  'дата',
  'id',
  'СтатусЗаявки',

  'Проведен',
  'ПометкаУдаления',
  // { field: 'ПометкаУдаления', value: false },
  'ПлановаяСтоимость',
  'ВидОперации',
  'ДатаСледующейПоверки',
  'Исполнитель',
  'КоличествоСчетчиков',
  'КонтактноеЛицо',
  'СуммаДокумента',

  'ОписаниеЗаявки',

  'Ответственный',
  'ID_1C',
  'ПланируемаяДата',
  'ПланируемоеВремя',
  'РайонГорода',
  'УправляющаяКомпания',
  'ЖелаемыйИнтервал',
  'БезналичныйРасчет',
  'Заказчик',
  'Телефон',
  'НаименованиеПолное',
  'ОсновноеКонтактноеЛицо',

  { customer: 'Абонент' },

  'Абонент',
  'ТипАбонента',
  'Фамилия',
  'Имя',
  'Отчество',

  // Адрес  / Address
  'Регион',
  'Округ',
  'абРайон',
  'НасПункт',
  'Улица',
  'Дом',
  'Корпус',
  'Квартира',
  'Район',

  'ID_Абонента',
  'Комментарий',

  'ИДЗаявки',

  'КоличествоСчетчиковЗагрузка',
];

let keys = Object.keys(entity);

let sql = 'SELECT * FROM `1c_b24` ORDER BY `b24_id` DESC';

console.log(keys);

let columns: any[] | undefined = [];
function App() {
  const [data, setData] = useState(0);

  cc_deal_fields.map((i, k) => {
    return (columns[k] = {
      key: i,
      dataIndex: i,
      title: i.toLocaleUpperCase(),
    });
  });

  useEffect(() => {
    setData([]);
  });
  return (
    <>
      <Table columns={columns} dataSource={[{ id: 1, дата: '2024/09/01' }]} />
    </>
  );
}

export default App;
