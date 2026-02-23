Angular 21 Date/Time Picker
========================

[![npm](https://img.shields.io/npm/v/@amrkh97/angular-datetime-picker.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/@amrkh97/angular-datetime-picker)
[![npm](https://img.shields.io/npm/dm/@amrkh97/angular-datetime-picker.svg)](https://www.npmjs.com/package/@amrkh97/angular-datetime-picker)

**The current version of this package supports Angular 21**

How to Use
-------

 1. Install with [npm](https://www.npmjs.com): `npm install @amrkh97/angular-datetime-picker --save`
 2. Add styles.
    If you are using Angular CLI, you can add this to your styles.css: 
    ```css
    @import "@amrkh97/angular-datetime-picker/assets/style/picker.min.css";
    ``` 
    If you are not using the Angular CLI, you can include the picker.min.css via a ```<link>``` element in your index.html.
 
Animation
-------
This picker uses CSS animations for smooth visual effects. No additional animation packages or providers are needed — `@angular/animations` is **not** required.

Properties for `owl-date-time`
-------
|Name|Type|Required|Default|Description|
|:--- |:--- |:--- |:--- |:--- |
|`pickerType`|`both`, `calendar`, `timer`|Optional|`both`| Set the type of the dateTime picker. `both`: show both calendar and timer, `calendar`: only show calendar, `timer`: only show timer. |
|`pickerMode`|`popup`, `dialog`|Optional|`popup`| The style the picker would open as. |
|`startView`|`month`, `year`, `multi-year`|Optional|`month`| The view that the calendar should start in. |
|`yearOnly`|boolean|Optional|`false`| Restricts the calendar to only show the year and multi-year views for month selection. |
|`multiyearOnly`|boolean|Optional|`false`| Restricts the calendar to only show the multi-year view for year selection. |
|`startAt`| T/null |Optional|`null`| The moment to open the picker to initially. |
|`endAt`| T/null |Optional|`null`| The the default selected time for range calendar end time | 
|`firstDayOfWeek`|number|Optional|`0`| Set the first day of week. Valid value is from 0 to 6. 0: Sunday - 6: Saturday|
|`showSecondsTimer`|boolean|Optional|`false`| When specify it to true, it would show a timer to configure the second's value |
|`hideOtherMonths`|boolean|Optional|`false`| Whether to hide dates in other months at the start or end of the current month |
|`hour12Timer`|boolean|Optional|`false`| When specify it to true, the timer would be in hour12 format mode|
|`stepHour`|number|Optional|`1`| Hours to change per step.|
|`stepMinute`|number|Optional|`1`| Minutes to change per step.|
|`stepSecond`|number|Optional|`1`| Seconds to change per step.|
|`scrollStrategy`|ScrollStrategy|Optional|`BlockScrollStrategy`| Define the scroll strategy when the picker is open. Learn more this from https://material.angular.io/cdk/overlay/overview#scroll-strategies.|
|`disabled`|boolean|Optional|`false`|When specify to true, it would disable the picker.|
|`backdropClass`|string/string[]|Optional|`null`|Custom class for the picker backdrop.|
|`panelClass`|string/string[]|Optional|`null`|Custom class for the picker overlay panel.|

Events for `owl-date-time`
-------
| Events              |Parameter| Description                                                                                     |
|:--------------------|:--- |:------------------------------------------------------------------------------------------------|
| `beforePickerOpen`    |null| Callback to invoke before the picker is opened                                                    |
| `afterPickerOpen`   |null| Callback to invoke when the picker is opened                                                    |
| `afterPickerClosed` |null| Callback to invoke when the picker is closed.                                                   |
| `yearSelected`      |T| Callback to invoke when the year is selected.This doesn't imply a change on the selected date.  |
| `monthSelected`     |T| Callback to invoke when the month is selected.This doesn't imply a change on the selected date. |
| `dateClicked`       |T| Callback when the selected data changes.                                                        |
| `selectedChanged`   |T| Callback when the currently selected data changes.                                              |
| `userSelection`     |null| Callback when any date is selected.                                                             |

Properties for `input[owlDateTime]`
-------
|Name|Type|Required|Default|Description|
|:--- |:--- |:--- |:--- |:--- |
|`owlDateTime`|`OwlDateTimeComponent<T>`|Require|`null`| The date time picker that this input is associated with.|
|`owlDateTimeFilter`|`( date: T)=>boolean `|Optional|`null`|A function to filter date time.|
|`disabled`|boolean|Optional|`false`|When specify to true, it would disable the picker's input.|
|`min`|`<T>`|Optional|`null`| The minimum valid date time.|
|`max`|`<T>`|Optional|`null`| The maximum valid date time.|
|`selectMode`|`single`, `range`, `rangeFrom`, `rangeTo`|Optional|`single`| Specify the picker's select mode. `single`: a single value allowed, `range`: allow users to select a range of date-time, `rangeFrom`: the input would only show the 'from' value and the picker could only selects 'from' value, `rangeTo`: the input would only show the 'to' value and the picker could only selects 'to' value.|
|`rangeSeparator`|string|Optional|`-`| The character to separate the 'from' and 'to' in input value in range selectMode.|

Events for `input[owlDateTime]`
-------
|Events|Parameter|Description|
|:--- |:--- |:--- |
|`dateTimeChange`|source: OwlDateTimeInput, value: input value, input: the input element|Callback to invoke when `change` event is fired on this `<input [owlDateTime]>`|
|`dateTimeInput`|source: OwlDateTimeInput, value: input value, input: the input element|Callback to invoke when an `input` event is fired on this `<input [owlDateTime]>`.|

Properties for `[owlDateTimeTrigger]`
-------
|Name|Type|Required|Default|Description|
|:--- |:--- |:--- |:--- |:--- |
|`owlDateTimeTrigger`|`OwlDateTimeComponent<T>`|Require|`null`| The date time picker that this trigger is associated with.|
|`disabled`|boolean|Optional|`false`|When specify to true, it would disable the trigger.|


Properties for `[owlDateTimeTrigger]`
-------
|Name|Type|Required|Default|Description|
|:--- |:--- |:--- |:--- |:--- |
|`owlDateTimeTrigger`|`OwlDateTimeComponent<T>`|Require|`null`| The date time picker that this trigger is associated with.|
|`disabled`|boolean|Optional|`false`|When specify to true, it would disable the trigger.|


Properties for `owl-date-time-inline`
-------
|Name|Type|Required|Default|Description|
|:--- |:--- |:--- |:--- |:--- |
|`pickerType`|`both`, `calendar`, `timer`|Optional|`both`| Set the type of the dateTime picker. `both`: show both calendar and timer, `calendar`: only show calendar, `timer`: only show timer. |
|`startView`|`month`, `year`, `multi-year`|Optional|`month`| The view that the calendar should start in. |
|`startAt`| T/null |Optional|`null`| The moment to open the picker to initially. |
|`endAt`| T/null |Optional|`null`| The the default selected time for range calendar end time | 
|`firstDayOfWeek`|number|Optional|`0`| Set the first day of week. Valid value is from 0 to 6. 0: Sunday - 6: Saturday|
|`showSecondsTimer`|boolean|Optional|`false`| When specify it to true, it would show a timer to configure the second's value |
|`hideOtherMonths`|boolean|Optional|`false`| Whether to hide dates in other months at the start or end of the current month |
|`hour12Timer`|boolean|Optional|`false`| When specify it to true, the timer would be in hour12 format mode|
|`stepHour`|number|Optional|`1`| Hours to change per step.|
|`stepMinute`|number|Optional|`1`| Minutes to change per step.|
|`stepSecond`|number|Optional|`1`| Seconds to change per step.|
|`disabled`|boolean|Optional|`false`|When specify to true, it would disable the picker.|
|`owlDateTimeFilter`|`( date: T)=>boolean `|Optional|`null`|A function to filter date time.|
|`min`|`<T>`|Optional|`null`| The minimum valid date time.|
|`max`|`<T>`|Optional|`null`| The maximum valid date time.|
|`selectMode`|`single`, `range`, `rangeFrom`, `rangeTo`|Optional|`single`| Specify the picker's select mode. `single`: a single value allowed, `range`: allow users to select a range of date-time, `rangeFrom`: the input would only show the 'from' value and the picker could only selects 'from' value, `rangeTo`: the input would only show the 'to' value and the picker could only selects 'to' value.|

Localization and DateTime Format
-------
Localization for different languages and formats is defined by `OWL_DATE_TIME_LOCALE` and `OWL_DATE_TIME_FORMATS`. You could learn more about this from [here](https://danielykpan.github.io/date-time-picker#locale-formats).


Dependencies
-------
none

License
-------
* License: MIT

Author
-------
**Maintained and updated by Amr Khaled, forked from Daniel Moncoda & original implementation by Daniel 
Pan**
