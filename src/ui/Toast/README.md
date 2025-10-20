# Toast Notification System

Универсальная система уведомлений для приложения.

## Использование

### 1. Подключение в App.jsx

```jsx
import { ToastProvider } from "./ui/Toast";

export default function App() {
  return (
    <ToastProvider>
      {/* Ваше приложение */}
    </ToastProvider>
  );
}
```

### 2. Использование в компонентах

```jsx
import { useToast } from "../../ui/Toast";

export default function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleAction = () => {
    showSuccess("Операция выполнена успешно!");
  };

  const handleError = () => {
    showError("Произошла ошибка!", 5000); // 5 секунд
  };

  return (
    <div>
      <button onClick={handleAction}>Выполнить</button>
    </div>
  );
}
```

## API

### useToast()

Возвращает объект с методами для показа уведомлений:

- `showSuccess(message, duration?)` - зеленое уведомление об успехе
- `showError(message, duration?)` - красное уведомление об ошибке  
- `showWarning(message, duration?)` - оранжевое предупреждение
- `showInfo(message, duration?)` - синее информационное уведомление
- `showToast(message, type, duration?)` - универсальный метод

### Параметры

- `message` (string) - текст уведомления
- `duration` (number) - время показа в миллисекундах (по умолчанию: 3000)
- `type` (string) - тип уведомления: "success", "error", "warning", "info"

## Особенности

- Автоматическое исчезновение через указанное время
- Возможность закрыть кликом на уведомление
- Поддержка множественных уведомлений
- Адаптивный дизайн для мобильных устройств
- Плавные анимации появления и исчезновения

## Стилизация

Уведомления автоматически стилизуются в зависимости от типа:
- **Success**: зеленый цвет (#27ae60)
- **Error**: красный цвет (#e74c3c)  
- **Warning**: оранжевый цвет (#f39c12)
- **Info**: синий цвет (основной цвет приложения)
