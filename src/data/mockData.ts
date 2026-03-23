export interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  type: 'text' | 'voice' | 'image';
  duration?: string;
  read: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  online: boolean;
  lastSeen?: string;
}

export interface Notification {
  id: string;
  type: 'message' | 'call' | 'mention';
  from: string;
  avatar: string;
  text: string;
  time: string;
  read: boolean;
}

export const chats: Chat[] = [
  {
    id: '1',
    name: 'Алексей Морозов',
    avatar: 'АМ',
    lastMessage: 'Окей, увидимся в пятницу!',
    time: '12:34',
    unread: 2,
    online: true,
    messages: [
      { id: 'm1', text: 'Привет! Как дела?', time: '12:20', isOwn: false, type: 'text', read: true },
      { id: 'm2', text: 'Всё отлично, спасибо! А у тебя?', time: '12:22', isOwn: true, type: 'text', read: true },
      { id: 'm3', text: 'Тоже хорошо. Встретимся в пятницу?', time: '12:30', isOwn: false, type: 'text', read: true },
      { id: 'm4', text: 'Окей, увидимся в пятницу!', time: '12:34', isOwn: true, type: 'text', read: true },
      { id: 'm5', text: '', time: '12:35', isOwn: false, type: 'voice', duration: '0:23', read: false },
      { id: 'm6', text: 'Жду с нетерпением 😊', time: '12:36', isOwn: false, type: 'text', read: false },
    ],
  },
  {
    id: '2',
    name: 'Команда проекта',
    avatar: 'КП',
    lastMessage: 'Дизайн утверждён, можно в разработку',
    time: '11:05',
    unread: 0,
    online: false,
    messages: [
      { id: 'm1', text: 'Всем привет! Обсудим задачи на неделю?', time: '10:00', isOwn: false, type: 'text', read: true },
      { id: 'm2', text: 'Да, готов', time: '10:05', isOwn: true, type: 'text', read: true },
      { id: 'm3', text: 'Дизайн утверждён, можно в разработку', time: '11:05', isOwn: false, type: 'text', read: true },
    ],
  },
  {
    id: '3',
    name: 'Мария Иванова',
    avatar: 'МИ',
    lastMessage: 'Голосовое сообщение',
    time: 'вчера',
    unread: 1,
    online: true,
    messages: [
      { id: 'm1', text: 'Документы отправила на почту', time: '14:10', isOwn: false, type: 'text', read: true },
      { id: 'm2', text: 'Получил, смотрю', time: '14:30', isOwn: true, type: 'text', read: true },
      { id: 'm3', text: '', time: '18:45', isOwn: false, type: 'voice', duration: '1:02', read: false },
    ],
  },
  {
    id: '4',
    name: 'Дмитрий Волков',
    avatar: 'ДВ',
    lastMessage: 'Спасибо за помощь!',
    time: 'вчера',
    unread: 0,
    online: false,
    messages: [
      { id: 'm1', text: 'Можешь помочь с задачей?', time: '16:00', isOwn: false, type: 'text', read: true },
      { id: 'm2', text: 'Конечно, рассказывай', time: '16:05', isOwn: true, type: 'text', read: true },
      { id: 'm3', text: 'Спасибо за помощь!', time: '17:30', isOwn: false, type: 'text', read: true },
    ],
  },
  {
    id: '5',
    name: 'Анна Смирнова',
    avatar: 'АС',
    lastMessage: 'Увидимся на конференции',
    time: 'пн',
    unread: 0,
    online: false,
    messages: [
      { id: 'm1', text: 'Ты будешь на конференции в следующем месяце?', time: '09:00', isOwn: false, type: 'text', read: true },
      { id: 'm2', text: 'Да, уже зарегистрировался', time: '09:15', isOwn: true, type: 'text', read: true },
      { id: 'm3', text: 'Увидимся на конференции', time: '09:20', isOwn: false, type: 'text', read: true },
    ],
  },
];

export const contacts: Contact[] = [
  { id: '1', name: 'Алексей Морозов', avatar: 'АМ', phone: '+7 900 123-45-67', online: true },
  { id: '2', name: 'Анна Смирнова', avatar: 'АС', phone: '+7 900 234-56-78', online: false, lastSeen: '2 часа назад' },
  { id: '3', name: 'Дмитрий Волков', avatar: 'ДВ', phone: '+7 900 345-67-89', online: false, lastSeen: 'вчера' },
  { id: '4', name: 'Екатерина Новикова', avatar: 'ЕН', phone: '+7 900 456-78-90', online: true },
  { id: '5', name: 'Иван Петров', avatar: 'ИП', phone: '+7 900 567-89-01', online: false, lastSeen: '5 минут назад' },
  { id: '6', name: 'Мария Иванова', avatar: 'МИ', phone: '+7 900 678-90-12', online: true },
  { id: '7', name: 'Николай Козлов', avatar: 'НК', phone: '+7 900 789-01-23', online: false, lastSeen: '3 дня назад' },
  { id: '8', name: 'Ольга Сидорова', avatar: 'ОС', phone: '+7 900 890-12-34', online: true },
];

export const notifications: Notification[] = [
  { id: '1', type: 'message', from: 'Алексей Морозов', avatar: 'АМ', text: 'Отправил голосовое сообщение', time: '12:35', read: false },
  { id: '2', type: 'call', from: 'Мария Иванова', avatar: 'МИ', text: 'Пропущенный видеозвонок', time: '11:20', read: false },
  { id: '3', type: 'mention', from: 'Команда проекта', avatar: 'КП', text: 'Упомянул вас в сообщении', time: '10:05', read: true },
  { id: '4', type: 'message', from: 'Дмитрий Волков', avatar: 'ДВ', text: 'Прислал фото', time: 'вчера', read: true },
  { id: '5', type: 'call', from: 'Анна Смирнова', avatar: 'АС', text: 'Входящий звонок · 4 мин', time: 'вчера', read: true },
];
