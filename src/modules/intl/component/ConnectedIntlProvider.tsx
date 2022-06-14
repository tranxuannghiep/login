import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { RootState } from "redux/reducer";
import enMessages from "../en.json";
import viMessages from "../vi.json";

function getMessages(locale: string): any {
  if (locale.startsWith("vi")) {
    return viMessages;
  }
  return enMessages;
}

function mapStateToProps(state: RootState) {
  return {
    locale: state.intlReducer.locale,
    messages: getMessages(state.intlReducer.locale),
  };
}

export default connect(mapStateToProps)(IntlProvider);
