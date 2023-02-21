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

export default class DiaryCalendar extends React.Component<{}, DemoAppState> {
  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
  };

  render() {
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
            // events={}                  ==> 실제 적용될 데이터 넣는 공간
            select={this.handleDateSelect}
            // eventClick={this.handleEventClick}   ==>> 세부 이벤트 클릭시 나오는 로직
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


  handleDateSelect = (selectInfo: DateSelectArg) => {
    /* 여기에 클릭했을때,
        작은 다이어리를 보이게 한다.
        캘린더에서 해당 id를 가진 다이어리를 클릭하면
        해당 값을 selected diary 라는 store 안에 넣도록 한다.

        예상 selected diary 값들
          {
            _id : string ;
            popup : boolean;    // 팝업될지 말지 결정하는 값
            diaryTitle: string;
            diaryContent: string;
            feeling:number;
            date : string
          }

        이후 popupCalendar 에 값을 넣으면
        팝업 캘린더가 나오도록 하게하자 
      */
  };

  // 세부 이벤트 클릭시 나오는 로직 (현재 필요 X)

  handleEventClick = (clickInfo: EventClickArg) => {
     if (
       window.confirm(
         `Are you sure you want to delete the event '${clickInfo.event.title}'`
       )
     ) {
       clickInfo.event.remove();
     }
  };
}
