PGDMP                         y        
   restaurant    13.2    13.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    32768 
   restaurant    DATABASE     f   CREATE DATABASE restaurant WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Polish_Poland.1250';
    DROP DATABASE restaurant;
                postgres    false            �            1259    40979 
   restaurant    TABLE     p  CREATE TABLE public.restaurant (
    id integer NOT NULL,
    user_id integer,
    name character varying,
    description character varying,
    category character varying,
    nip character varying,
    phone character varying,
    city character varying NOT NULL,
    street character varying,
    apart_number character varying,
    image_url character varying
);
    DROP TABLE public.restaurant;
       public         heap    postgres    false            �            1259    40982    restaurant_id_seq    SEQUENCE     �   ALTER TABLE public.restaurant ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.restaurant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    200            �            1259    73747    session    TABLE     �   CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
    DROP TABLE public.session;
       public         heap    postgres    false            �            1259    49171    tables    TABLE     �   CREATE TABLE public.tables (
    id integer NOT NULL,
    id_rest integer,
    numb_seats integer,
    image_url character varying
);
    DROP TABLE public.tables;
       public         heap    postgres    false            �            1259    49174    tables_id_seq    SEQUENCE     �   ALTER TABLE public.tables ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tables_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    65557    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(500)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    65555    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    205            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    204            6           2604    65560    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            �          0    40979 
   restaurant 
   TABLE DATA           �   COPY public.restaurant (id, user_id, name, description, category, nip, phone, city, street, apart_number, image_url) FROM stdin;
    public          postgres    false    200   �       �          0    73747    session 
   TABLE DATA           4   COPY public.session (sid, sess, expire) FROM stdin;
    public          postgres    false    206   S       �          0    49171    tables 
   TABLE DATA           D   COPY public.tables (id, id_rest, numb_seats, image_url) FROM stdin;
    public          postgres    false    202   p       �          0    65557    users 
   TABLE DATA           0   COPY public.users (id, name, email) FROM stdin;
    public          postgres    false    205   �       �           0    0    restaurant_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.restaurant_id_seq', 1, true);
          public          postgres    false    201            �           0    0    tables_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.tables_id_seq', 31, true);
          public          postgres    false    203            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 17, true);
          public          postgres    false    204            =           2606    73754    session session_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            postgres    false    206            8           2606    65567    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    205            :           2606    65565    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    205            ;           1259    73755    IDX_session_expire    INDEX     J   CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);
 (   DROP INDEX public."IDX_session_expire";
       public            postgres    false    206            �   U   x�3���L)-H
%�
U�Y�I��%�
E�@��(19+Q�3�����ļTNC#cS3sKNsΪD���T@C�b���� ��S      �      x������ � �      �   Q   x��A
� еs��Ԍ�9ZE�"	A!�O�{��;se��c��<ji��
 
�=�KZ>�y�����";C�)���-��a      �   (   x�3�L�(���M,J�����O�02v(/�+������ ��	�     