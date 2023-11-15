import S from 'fluent-json-schema'

export const userCreateSchema = {
  body: S.object()
  .prop('name', S.string().required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object()
}