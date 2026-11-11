-- Pegalo en Supabase > SQL Editor > Run
-- Cambiá el email por el MISMO que vas a usar para tu usuario admin.

create table if not exists site_content (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz default now(),
  constraint una_sola_fila check (id = 1)
);

alter table site_content enable row level security;

create policy "lectura publica" on site_content
  for select using (true);

create policy "solo el admin inserta" on site_content
  for insert to authenticated
  with check ((auth.jwt() ->> 'email') = 'thiagocampa7@gmail.com');

create policy "solo el admin modifica" on site_content
  for update to authenticated
  using ((auth.jwt() ->> 'email') = 'thiagocampa7@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'thiagocampa7@gmail.com');
