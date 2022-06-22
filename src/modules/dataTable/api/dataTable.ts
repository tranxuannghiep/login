import { FAKE_DATA } from "./fake-data";
import { FilterTableState } from "modules/dataTable/redux/dataTableReducer";

const checkTimeFrom = (
  date_confirmed: string | null,
  timeFrom: string | undefined
) => {
  return timeFrom
    ? date_confirmed
      ? date_confirmed.localeCompare(timeFrom) !== -1
      : false
    : true;
};

const checkTimeTo = (
  date_confirmed: string | null,
  timeTo: string | undefined
) => {
  return timeTo
    ? date_confirmed
      ? date_confirmed.localeCompare(timeTo) !== 1
      : false
    : true;
};

const getAll = (filter: FilterTableState) => {
  const { page, limit } = filter;
  const data = FAKE_DATA.payrolls.filter((val) => {
    if (filter.status) {
      if (filter.status === "received") {
        return (
          val.received &&
          (filter.search
            ? val.subpayroll_ids
                .toString()
                .toLowerCase()
                .includes(filter.search.toLowerCase()) &&
              checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
              checkTimeTo(val.date_confirmed, filter.timeTo)
            : checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
              checkTimeTo(val.date_confirmed, filter.timeTo))
        );
      } else if (filter.status === "processing") {
        return (
          (val.approved || val.matched) &&
          !val.received &&
          (filter.search
            ? val.subpayroll_ids
                .toString()
                .toLowerCase()
                .includes(filter.search.toLowerCase()) &&
              checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
              checkTimeTo(val.date_confirmed, filter.timeTo)
            : checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
              checkTimeTo(val.date_confirmed, filter.timeTo))
        );
      } else if (filter.status === "fulfilled") {
        return (
          val.fulfilled &&
          !val.received &&
          (filter.search
            ? val.subpayroll_ids
                .toString()
                .toLowerCase()
                .includes(filter.search.toLowerCase()) &&
              checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
              checkTimeTo(val.date_confirmed, filter.timeTo)
            : checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
              checkTimeTo(val.date_confirmed, filter.timeTo))
        );
      } else if (filter.status === "canceled") {
        return (
          val.canceled &&
          !val.received &&
          (filter.search
            ? val.subpayroll_ids
                .toString()
                .toLowerCase()
                .includes(filter.search.toLowerCase()) &&
              checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
              checkTimeTo(val.date_confirmed, filter.timeTo)
            : checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
              checkTimeTo(val.date_confirmed, filter.timeTo))
        );
      }
      return (
        !val.received &&
        !val.canceled &&
        (filter.search
          ? val.subpayroll_ids
              .toString()
              .toLowerCase()
              .includes(filter.search.toLowerCase()) &&
            checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
            checkTimeTo(val.date_confirmed, filter.timeTo)
          : checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
            checkTimeTo(val.date_confirmed, filter.timeTo))
      );
    } else {
      return filter.search
        ? val.subpayroll_ids
            .toString()
            .toLowerCase()
            .includes(filter.search.toLowerCase()) &&
            checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
            checkTimeTo(val.date_confirmed, filter.timeTo)
        : checkTimeFrom(val.date_confirmed, filter.timeFrom) &&
            checkTimeTo(val.date_confirmed, filter.timeTo);
    }
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: data.slice((page - 1) * limit, page * limit),
        pagination: {
          page: page,
          limit,
          total: data.length,
        },
      });
    }, 500);
  });
};
const getCurrency = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        FAKE_DATA.payrolls.reduce((acc: string[], val) => {
          if (!acc.includes(val.currency)) acc.push(val.currency);
          return acc;
        }, [])
      );
    }, 500);
  });
};

export { getAll, getCurrency };
