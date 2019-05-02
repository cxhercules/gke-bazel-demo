// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import {Action} from '@ngrx/store';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TOGGLE_DONE = 'TOGGLE_DONE';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export interface TodoPayload {
  index?: number;
  done?: boolean;
  value?: string;
  newValue?: string;
}

export function todoReducer(state = [], action: ActionWithPayload<TodoPayload>) {
  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];
    case DELETE_TODO:
      return state.filter((item, index) => index !== action.payload.index);
    case UPDATE_TODO:
      return state.map((item, index) => {
        return index === action.payload.index ? {...item, value: action.payload.newValue} : item;
      });
    case TOGGLE_DONE:
      return state.map((item, index) => {
        return index === action.payload.index ? {...item, done: !action.payload.done} : item;
      });
    default:
      return state;
  }
}
