INSERT INTO "user" (
  "userId", "name", "username", "dateOfBirth", "age", "role", "description",
  "photoUrl", "isVisibleToOthers", "showUsername", "online",
  "state", "isBlocked", "enableNotification", "activeRoom",
  "pastPartners", "currentPartner", "lastCleaned", "lastLoginTimestamp"
) VALUES
  ('100001', 'Алексей', 'alex_test1', '1998-05-15', 26, 'ACTIVE', 'Люблю спорт и путешествия. Ищу интересного собеседника.', NULL, true, true, false, 'QUICK_SEARCH', false, true, '', '{}', NULL, 0, 0),
  ('100002', 'Дмитрий', 'dima_test2', '2000-11-22', 25, 'PASSIVE', 'Программист, гейммер, люблю аниме и кино.', NULL, true, true, false, 'QUICK_SEARCH', false, true, '', '{}', NULL, 0, 0),
  ('100003', 'Максим', 'max_test3', '1995-03-08', 30, 'UNI', 'Фотограф. Снимаю людей и город. Открыт к общению.', NULL, true, false, false, 'QUICK_SEARCH', false, true, '', '{}', NULL, 0, 0),
  ('100004', 'Артём', 'artem_test4', '1999-07-30', 26, 'UNI_PASSIVE', 'Музыкант, играю на гитаре. Люблю рок и джаз.', NULL, true, true, false, 'QUICK_SEARCH', false, true, '', '{}', NULL, 0, 0),
  ('100005', 'Кирилл', 'kirill_test5', '1997-01-14', 29, 'UNI_ACTIVE', 'Тренер по фитнесу. Помогу прокачать тело и дух.', NULL, true, false, false, 'QUICK_SEARCH', false, true, '', '{}', NULL, 0, 0),
  ('100006', 'Иван', 'ivan_test6', '2001-09-03', 24, 'ACTIVE', 'Студент, изучаю дизайн. Рисую и леплю.', NULL, true, true, false, 'QUICK_SEARCH', false, true, '', '{}', NULL, 0, 0),
  ('100007', 'Никита', 'nikita_test7', '1996-12-25', 29, 'PASSIVE', 'Повар, люблю готовить и угощать. Приходи на ужин.', NULL, true, false, false, 'QUICK_SEARCH', false, true, '', '{}', NULL, 0, 0),
  ('100008', 'Сергей', 'sergey_test8', '1994-06-17', 31, 'UNI', 'Архитектор. Строю дома и отношения.', NULL, true, true, false, 'QUICK_SEARCH', false, true, '', '{}', NULL, 0, 0),
  ('100009', 'Андрей', 'andrey_test9', '2002-02-28', 23, 'NOT_DECIDE', 'Только зарегался, осматриваюсь. Расскажи о себе.', NULL, true, false, false, 'QUICK_SEARCH', false, true, '', '{}', NULL, 0, 0),
  ('100010', 'Влад', 'vlad_test10', '1993-08-10', 32, 'ACTIVE', 'Бизнесмен, много путешествую. Ищу компанию в поездки.', NULL, true, true, false, 'QUICK_SEARCH', false, true, '', '{}', NULL, 0, 0)
ON CONFLICT ("userId") DO NOTHING;
