import { ActionType } from './actionTypes'

export interface ActionBase<T extends ActionType> {
  readonly type: T
  readonly dontUpdateLastModifiedDate?: boolean
}

export interface SetterActionBase<T extends ActionType, P> extends ActionBase<T> {
  readonly payload: P
}

export interface DictionarySetterActionBase<T extends ActionType, P, K> extends SetterActionBase<T, P> {
  readonly key: K
}

export interface PropertyMetadataSetterActionBase<T extends ActionType, P> extends SetterActionBase<T, P> {
  readonly lastModified: number
}

export interface PropertyMetadataDictionarySetterActionBase<T extends ActionType, P, K> extends DictionarySetterActionBase<T, P, K> {
  readonly lastModified: number
}
