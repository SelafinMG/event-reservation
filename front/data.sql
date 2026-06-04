Events
                  id                  |      title
--------------------------------------+------------------
 8e2c8a02-85c6-4b26-8616-fd0237470f18 | TechConf 2025
 92577888-99f2-41a0-a2ef-490b50b0cab6 | DevSummit Europe
 e260d12a-907b-4b57-9944-6b58d5ba469d | AI & Data Forum

Rooms
                  id                  |            name
--------------------------------------+----------------------------
 217491ba-c0c5-4ab5-922d-0842dc8f9ae5 | Amphi A - Grand Auditorium
 87700d2a-4ad3-4cf0-b114-2afdf74881fe | Salle B - Workshop
 6492235c-867b-4fa2-994e-b5285082279d | Salle C - Conférence
 b7f6c55b-9489-4802-af5c-5f65aed7b4d3 | Salle D - Lab

Speakers
                   id                  |   full_name
--------------------------------------+----------------
 296a50fe-7123-4b25-a7d1-7a961b9d7cdb | Alice Martin
 fa8a2379-261e-4da0-9cc9-a77c3e5573c7 | Thomas Dubois
 c61d6f4a-0da3-486e-8f2a-994805311119 | Sophie Chen
 f8124b23-723f-4e6c-bfe8-0393f20f3f23 | Marc Lefebvre
 ed5f2d4d-4949-411a-8ab6-443551370906 | Emma Rodriguez
 f102b2ea-d1b0-463c-b2f5-76ee3e8df904 | Lucas Bernard

Sessions
                   id                  |                    title
--------------------------------------+---------------------------------------------
 3cb9b771-209d-43c4-bc9a-7ba9ca599822 | Keynote d'ouverture - L'avenir du web
 975c1fd5-5661-48a1-856b-31b058bdbe0d | React 19 : Les nouveautés
 6d6c29e7-4334-40b0-a816-a3fb0f423b58 | Workshop : Introduction au Machine Learning
 f3769363-de71-4842-ac21-9c547c92197f | DevOps : CI/CD à grande échelle
 675b1870-bb70-4bd8-9f77-67340ca59d94 | Kubernetes avancé
 89b3a21b-e04a-4535-8b32-ac1f400eb106 | Sécurité des APIs
 a7aa9e8e-779d-4986-86a5-7deb1dc87341 | NLP et LLMs en production
 7bc4adfb-aa9d-4cb4-a515-3c7bac290f96 | Opening Keynote - Future of Development

INSERT INTO session_speakers (session_id, speaker_id) VALUES
  ('3cb9b771-209d-43c4-bc9a-7ba9ca599822', '296a50fe-7123-4b25-a7d1-7a961b9d7cdb'),
  ('975c1fd5-5661-48a1-856b-31b058bdbe0d', 'fa8a2379-261e-4da0-9cc9-a77c3e5573c7'),
  ('6d6c29e7-4334-40b0-a816-a3fb0f423b58', '296a50fe-7123-4b25-a7d1-7a961b9d7cdb'),
  ('f3769363-de71-4842-ac21-9c547c92197f', 'fa8a2379-261e-4da0-9cc9-a77c3e5573c7'),
  ('675b1870-bb70-4bd8-9f77-67340ca59d94', 'c61d6f4a-0da3-486e-8f2a-994805311119'),
  ('89b3a21b-e04a-4535-8b32-ac1f400eb106', 'f8124b23-723f-4e6c-bfe8-0393f20f3f23'),
  ('3cb9b771-209d-43c4-bc9a-7ba9ca599822', 'fa8a2379-261e-4da0-9cc9-a77c3e5573c7'),
  ('975c1fd5-5661-48a1-856b-31b058bdbe0d', 'c61d6f4a-0da3-486e-8f2a-994805311119'),
  ('6d6c29e7-4334-40b0-a816-a3fb0f423b58', 'f8124b23-723f-4e6c-bfe8-0393f20f3f23'),
  ('f3769363-de71-4842-ac21-9c547c92197f', 'ed5f2d4d-4949-411a-8ab6-443551370906'),
  ('675b1870-bb70-4bd8-9f77-67340ca59d94', 'f102b2ea-d1b0-463c-b2f5-76ee3e8df904'),
  ('89b3a21b-e04a-4535-8b32-ac1f400eb106', 'ed5f2d4d-4949-411a-8ab6-443551370906');

INSERT INTO questions (session_id, content, author_name, upvotes, created_at)
VALUES
  ('3cb9b771-209d-43c4-bc9a-7ba9ca599822', 'Quelles sont les breaking changes majeures de React 19 ?', 'Marie D.', 42, '2025-06-10T10:35:00Z'),
  ('975c1fd5-5661-48a1-856b-31b058bdbe0d', 'Comment migrer progressivement de React 18 vers 19 ?', 'Pierre L.', 28, '2025-06-10T10:40:00Z'),
  ('3cb9b771-209d-43c4-bc9a-7ba9ca599822', 'Les Server Components sont-ils prêts pour la production ?', NULL, 35, '2025-06-10T10:45:00Z'),
  ('6d6c29e7-4334-40b0-a816-a3fb0f423b58', 'Quel framework ML recommandez-vous pour débuter ?', 'Sophie M.', 15, '2025-06-10T11:00:00Z'),
  ('6d6c29e7-4334-40b0-a816-a3fb0f423b58', 'Comment évaluer la performance d''un modèle de classification ?', NULL, 22, '2025-06-10T11:15:00Z'),
  ('f3769363-de71-4842-ac21-9c547c92197f', 'Quelle est la différence entre un Deployment et un StatefulSet ?', 'Alex K.', 18, '2025-06-10T15:45:00Z'),
  ('a7aa9e8e-779d-4986-86a5-7deb1dc87341', 'Quel est le coût d''inférence moyen pour un LLM en production ?', 'Julie R.', 31, '2025-06-11T10:50:00Z');
