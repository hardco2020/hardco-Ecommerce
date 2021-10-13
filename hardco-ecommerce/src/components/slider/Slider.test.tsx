import { fireEvent, render } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import Slider from './Slider'


test('Check render wrapper inital translate style value', () => {
  const { getByTestId } = render(<Slider/>);
  const wrapperCom = getByTestId("wrapper")

  expect(wrapperCom).toHaveStyle("transform: translateX(100vw)")
  
});

test('arrowLeft slide will change the translate or not',()=>{
  const { getByTestId } = render(<Slider/>);
  const wrapperCom = getByTestId("wrapper");
  const arrowRight = getByTestId("arrowRight");
  const arrowLeft = getByTestId("arrowLeft");
  expect(wrapperCom).toHaveStyle("transform: translateX(100vw)")
  fireEvent(
    arrowRight,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  //-1*-100 = 100 0 
  expect(wrapperCom).toHaveStyle("transform: translateX(0vw)")
  fireEvent(
    arrowLeft,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  expect(wrapperCom).toHaveStyle("transform: translateX(100vw)")
});

test('makesure when exceed limitation slide ,it will come back to most left slide or most right slide',()=>{
  const { getByTestId } = render(<Slider/>);
  const wrapperCom = getByTestId("wrapper");
  const arrowRight = getByTestId("arrowRight");
  const arrowLeft = getByTestId("arrowLeft");
  expect(wrapperCom).toHaveStyle("transform: translateX(100vw)")
  fireEvent(
    arrowLeft,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  expect(wrapperCom).toHaveStyle("transform: translateX(-100vw)")
  fireEvent(
    arrowRight,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  )
  expect(wrapperCom).toHaveStyle("transform: translateX(100vw)")
});

