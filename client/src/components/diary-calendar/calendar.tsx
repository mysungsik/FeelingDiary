import React from "react";
import { EventApi, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { INITIAL_EVENTS } from "./event-utils";
import styles from "./calendar.module.scss";

interface DemoAppState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

interface Props {
  calendarData: { title: string; start: string; id: string | undefined }[];
  getSelectedId: (id: string) => void;
}

export default class DiaryCalendar extends React.Component<
  Props,
  {},
  DemoAppState
> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
  };

  render() {
    const calendarData = this.props.calendarData;

    return (
      <div className={styles.calendar}>
        <div className={styles.calendar__main}>
          <h1 className={styles.calendar__title}>나의 다이어리</h1>
          <FullCalendar
            plugins={[dayGridPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth",
            }}
            initialView="dayGridMonth"
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // 초기 데이터 넣는 공간
            events={calendarData}
            // select={this.handleDateSelect}
            eventClick={this.handleEventClick}
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    );
  }

  // handleDateSelect = (selectInfo: DateSelectArg) => {

  // };

  handleEventClick = (clickInfo: EventClickArg) => {
    this.props.getSelectedId(clickInfo.event.id);
  };
}
