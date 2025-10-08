'use client';

import { useState, useReducer } from 'react';
import { Button } from '@/components/ui/button';

type State = {
  currentOperand: string | null;
  previousOperand: string | null;
  operation: string | null;
  overwrite: boolean;
};

const initialState: State = {
  currentOperand: '0',
  previousOperand: null,
  operation: null,
  overwrite: true,
};

const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
  SPECIAL: 'special',
};

function reducer(state: State, { type, payload }: { type: string, payload?: any }): State {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return { ...state, currentOperand: payload.digit, overwrite: false };
      }
      if (payload.digit === '0' && state.currentOperand === '0') return state;
      if (payload.digit === '.' && state.currentOperand?.includes('.')) return state;
      return { ...state, currentOperand: `${state.currentOperand || ''}${payload.digit}` };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) return state;
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: '0',
          overwrite: true,
        };
      }
      if (state.currentOperand == '0' || state.currentOperand == null) {
        return { ...state, operation: payload.operation };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: '0',
        overwrite: true,
      };
      
    case ACTIONS.CLEAR:
      return { ...initialState };

    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) return state;
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    case ACTIONS.SPECIAL:
      if (state.currentOperand == null) return state;
      const current = parseFloat(state.currentOperand);
      let result;
      switch(payload.func) {
        case '±': result = current * -1; break;
        case '%': result = current / 100; break;
        case '√': result = Math.sqrt(current); break;
        case 'sin': result = Math.sin(current * Math.PI / 180); break;
        case 'cos': result = Math.cos(current * Math.PI / 180); break;
        case 'tan': result = Math.tan(current * Math.PI / 180); break;
        case 'log': result = Math.log10(current); break;
        case 'ln': result = Math.log(current); break;
        default: return state;
      }
      return {...state, currentOperand: result.toString(), overwrite: true};

    default:
      return state;
  }
}

function evaluate({ currentOperand, previousOperand, operation }: State): string {
  const prev = parseFloat(previousOperand!);
  const current = parseFloat(currentOperand!);
  if (isNaN(prev) || isNaN(current)) return '';
  let computation: number = 0;
  switch (operation) {
    case '+': computation = prev + current; break;
    case '-': computation = prev - current; break;
    case '×': computation = prev * current; break;
    case '÷': computation = prev / current; break;
    case '^': computation = Math.pow(prev, current); break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});

function formatOperand(operand: string | null) {
  if (operand == null) return '';
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(parseFloat(integer));
  return `${INTEGER_FORMATTER.format(parseFloat(integer))}.${decimal}`;
}

const CalcButton = ({ dispatch, action, payload, children, className }: any) => (
  <Button
    variant="secondary"
    className={`h-16 text-2xl rounded-xl shadow-md transition-transform duration-100 active:scale-95 ${className}`}
    onClick={() => dispatch({ type: action, payload })}
  >
    {children}
  </Button>
);

export function Calculator() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full max-w-md bg-card p-4 rounded-2xl shadow-2xl border">
        <div className="bg-background/50 rounded-lg p-4 text-right mb-4 min-h-[100px] flex flex-col justify-end break-all">
          <div className="text-muted-foreground text-2xl">
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className="text-foreground text-5xl font-bold">
            {formatOperand(currentOperand)}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {/* Advanced Functions */}
          <CalcButton dispatch={dispatch} action={ACTIONS.SPECIAL} payload={{ func: 'sin' }} className="bg-primary/50 hover:bg-primary/70">sin</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.CHOOSE_OPERATION} payload={{ operation: '^' }} className="bg-accent text-accent-foreground hover:bg-accent/90 text-xl">xʸ</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.SPECIAL} payload={{ func: '±' }} className="bg-accent text-accent-foreground hover:bg-accent/90">±</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.SPECIAL} payload={{ func: '%' }} className="bg-accent text-accent-foreground hover:bg-accent/90">%</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.CLEAR} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">AC</CalcButton>

          <CalcButton dispatch={dispatch} action={ACTIONS.SPECIAL} payload={{ func: 'cos' }} className="bg-primary/50 hover:bg-primary/70">cos</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.ADD_DIGIT} payload={{ digit: '7' }}>7</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.ADD_DIGIT} payload={{ digit: '8' }}>8</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.ADD_DIGIT} payload={{ digit: '9' }}>9</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.CHOOSE_OPERATION} payload={{ operation: '÷' }} className="bg-accent text-accent-foreground hover:bg-accent/90">÷</CalcButton>

          <CalcButton dispatch={dispatch} action={ACTIONS.SPECIAL} payload={{ func: 'tan' }} className="bg-primary/50 hover:bg-primary/70">tan</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.ADD_DIGIT} payload={{ digit: '4' }}>4</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.ADD_DIGIT} payload={{ digit: '5' }}>5</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.ADD_DIGIT} payload={{ digit: '6' }}>6</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.CHOOSE_OPERATION} payload={{ operation: '×' }} className="bg-accent text-accent-foreground hover:bg-accent/90">×</CalcButton>

          <CalcButton dispatch={dispatch} action={ACTIONS.SPECIAL} payload={{ func: 'log' }} className="bg-primary/50 hover:bg-primary/70">log</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.ADD_DIGIT} payload={{ digit: '1' }}>1</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.ADD_DIGIT} payload={{ digit: '2' }}>2</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.ADD_DIGIT} payload={{ digit: '3' }}>3</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.CHOOSE_OPERATION} payload={{ operation: '-' }} className="bg-accent text-accent-foreground hover:bg-accent/90">-</CalcButton>

          <CalcButton dispatch={dispatch} action={ACTIONS.SPECIAL} payload={{ func: '√' }} className="bg-primary/50 hover:bg-primary/70">√</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.ADD_DIGIT} payload={{ digit: '0' }} className="col-span-2">0</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.ADD_DIGIT} payload={{ digit: '.' }}>.</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.CHOOSE_OPERATION} payload={{ operation: '+' }} className="bg-accent text-accent-foreground hover:bg-accent/90">+</CalcButton>

          <CalcButton dispatch={dispatch} action={ACTIONS.SPECIAL} payload={{ func: 'ln' }} className="bg-primary/50 hover:bg-primary/70">ln</CalcButton>
          <CalcButton dispatch={dispatch} action={ACTIONS.EVALUATE} className="col-span-4 bg-accent text-accent-foreground hover:bg-accent/90">=</CalcButton>
        </div>
      </div>
    </div>
  );
}
