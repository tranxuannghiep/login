// import { ITodo } from "models/Todo";
import { ActionType, createCustomAction, getType } from "typesafe-actions";

export interface FilterTableState {
  page: number;
  limit: number;
  status?: string;
  timeFrom?: string;
  timeTo?: string;
  search?: string;
}

export interface PayRolls {
  payroll_id: string;
  received: boolean;
  approved: boolean;
  canceled: boolean;
  date_confirmed: string | null;
  currency: string;
  fulfilled: boolean;
  matched: boolean;
  volume_input_in_input_currency: number;
  subpayroll_ids: string | null;
}

export interface DataTableState {
  payrolls: PayRolls[];
  // filter: FilterTableState;
  currencies: string[];
}
export const getPayrolls = createCustomAction(
  "dataTable/getPayrolls",
  (data: PayRolls[]) => ({
    data,
  })
);

export const deletePayroll = createCustomAction(
  "dataTable/deletePayroll",
  (id: string) => ({
    id,
  })
);

export const updatePayroll = createCustomAction(
  "dataTable/updatePayroll",
  (data: PayRolls) => ({
    data,
  })
);

export const getCurrencies = createCustomAction(
  "dataTable/getCurrencies",
  (data: string[]) => ({
    data,
  })
);

const actions = {
  getPayrolls,
  deletePayroll,
  updatePayroll,
  getCurrencies,
};
type Action = ActionType<typeof actions>;

export default function dataTableReducer(
  state: DataTableState = {
    payrolls: [],
    currencies: [],
  },
  action: Action
) {
  switch (action.type) {
    case getType(getPayrolls):
      return { ...state, payrolls: action.data };
    case getType(deletePayroll):
      const idx = state.payrolls.findIndex(
        (payroll) => payroll.payroll_id === action.id
      );
      if (idx !== -1)
        return {
          ...state,
          payrolls: [
            ...state.payrolls.slice(0, idx),
            ...state.payrolls.slice(idx + 1),
          ],
        };
      return state;
    case getType(updatePayroll):
      const idxUpdate = state.payrolls.findIndex(
        (payroll) => payroll.payroll_id === action.data.payroll_id
      );
      if (idxUpdate !== -1)
        return {
          ...state,
          payrolls: [
            ...state.payrolls.slice(0, idxUpdate),
            { ...action.data },
            ...state.payrolls.slice(idxUpdate + 1),
          ],
        };
      return state;
    case getType(getCurrencies):
      return {
        ...state,
        currencies: action.data,
      };
    default:
      return state;
  }
}
