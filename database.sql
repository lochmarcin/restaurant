PGDMP         -                y        
   restaurant    13.2    13.2 &    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    32768 
   restaurant    DATABASE     f   CREATE DATABASE restaurant WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Polish_Poland.1250';
    DROP DATABASE restaurant;
                postgres    false            �            1259    73770    menu_restaurant    TABLE     �   CREATE TABLE public.menu_restaurant (
    id integer NOT NULL,
    page integer,
    id_rest integer,
    image_url character varying
);
 #   DROP TABLE public.menu_restaurant;
       public         heap    postgres    false            �            1259    73773    menu_restaurant_id_seq    SEQUENCE     �   ALTER TABLE public.menu_restaurant ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.menu_restaurant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    209            �            1259    90137 	   open_time    TABLE     ]  CREATE TABLE public.open_time (
    id integer NOT NULL,
    id_rest integer,
    mon_open time without time zone,
    mon_close time without time zone,
    tue_open time without time zone,
    tue_close time without time zone,
    wed_open time without time zone,
    wed_close time without time zone,
    thu_open time without time zone,
    thu_close time without time zone,
    fri_open time without time zone,
    fri_close time without time zone,
    sat_open time without time zone,
    sat_close time without time zone,
    sun_open time without time zone,
    sun_close time without time zone
);
    DROP TABLE public.open_time;
       public         heap    postgres    false            �            1259    90140    open_time_id_seq    SEQUENCE     �   ALTER TABLE public.open_time ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.open_time_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            �            1259    81939    rating_comment    TABLE     �   CREATE TABLE public.rating_comment (
    id integer,
    id_rest integer,
    rating integer,
    comment character varying,
    id_user integer,
    date_comment timestamp without time zone
);
 "   DROP TABLE public.rating_comment;
       public         heap    postgres    false            �            1259    73756    reserwation    TABLE     �   CREATE TABLE public.reserwation (
    id integer NOT NULL,
    id_user integer,
    id_restaurant integer,
    id_table integer,
    time_reserwation timestamp without time zone,
    date_booking date,
    time_booking time(0) without time zone
);
    DROP TABLE public.reserwation;
       public         heap    postgres    false            �            1259    73759    reserwation_id_seq    SEQUENCE     �   ALTER TABLE public.reserwation ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.reserwation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    207            �            1259    40979 
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
    image_url character varying,
    number_table character varying
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
    email character varying(500),
    password character varying,
    refresh_token character varying,
    role character varying
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
          public          postgres    false    204            O           2604    65560    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �          0    73770    menu_restaurant 
   TABLE DATA           G   COPY public.menu_restaurant (id, page, id_rest, image_url) FROM stdin;
    public          postgres    false    209   �+       �          0    90137 	   open_time 
   TABLE DATA           �   COPY public.open_time (id, id_rest, mon_open, mon_close, tue_open, tue_close, wed_open, wed_close, thu_open, thu_close, fri_open, fri_close, sat_open, sat_close, sun_open, sun_close) FROM stdin;
    public          postgres    false    212   �+       �          0    81939    rating_comment 
   TABLE DATA           ]   COPY public.rating_comment (id, id_rest, rating, comment, id_user, date_comment) FROM stdin;
    public          postgres    false    211   J,       �          0    73756    reserwation 
   TABLE DATA           y   COPY public.reserwation (id, id_user, id_restaurant, id_table, time_reserwation, date_booking, time_booking) FROM stdin;
    public          postgres    false    207   g,       �          0    40979 
   restaurant 
   TABLE DATA           �   COPY public.restaurant (id, user_id, name, description, category, nip, phone, city, street, apart_number, image_url) FROM stdin;
    public          postgres    false    200   �,       �          0    73747    session 
   TABLE DATA           4   COPY public.session (sid, sess, expire) FROM stdin;
    public          postgres    false    206   :-       �          0    49171    tables 
   TABLE DATA           R   COPY public.tables (id, id_rest, numb_seats, image_url, number_table) FROM stdin;
    public          postgres    false    202   W-       �          0    65557    users 
   TABLE DATA           O   COPY public.users (id, name, email, password, refresh_token, role) FROM stdin;
    public          postgres    false    205   �-       �           0    0    menu_restaurant_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.menu_restaurant_id_seq', 3, true);
          public          postgres    false    210            �           0    0    open_time_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.open_time_id_seq', 54, true);
          public          postgres    false    213            �           0    0    reserwation_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.reserwation_id_seq', 5, true);
          public          postgres    false    208            �           0    0    restaurant_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.restaurant_id_seq', 1, true);
          public          postgres    false    201            �           0    0    tables_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.tables_id_seq', 39, true);
          public          postgres    false    203            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 18, true);
          public          postgres    false    204            V           2606    73754    session session_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            postgres    false    206            Q           2606    65567    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    205            S           2606    65565    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    205            T           1259    73755    IDX_session_expire    INDEX     J   CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);
 (   DROP INDEX public."IDX_session_expire";
       public            postgres    false    206            �      x�3���4\1z\\\ ��      �   K   x�31�4�4��26�20�42� ��E"$�p�X�,�	��Áw��N��!�Yk<0֚��1z\\\ x�V      �      x������ � �      �   ]   x�m���0�o����ja'��s�hc���u� ���Q�$�	�H��К��RV�FBf����;7�xF�6���`���GzR��}�gf> �f }      �   V   x�3�4��L)-H
%�
U�Y�I��%�
E�@��(19+Q�3�����ļTNC#cS3sKNsΪD���T�1~\1z\\\ �8      �      x������ � �      �   �   x���A
�0F�u�.��?�4i��J�"(��fђ���������ehbia�"2�(�Do8a����r>w�.$~��Y�{e�k`Mv��"�v�R[eWk�Z�����F�ݾ���5�M]㮷�\�F�0� n0�      �   �   x�-�Ms�0 D��;�6P�[+�4����2�8>��ï/���ag߻��z�J����h	5̧��Pv�?�n+��ߵ;׌\�g���I�2Ć���Ym���)X���Y>|�� �!:�>��۾G��@)%��GX��G�c���� .��K�.r�$u�4�Q}���ŭI����X�����9�'O�Ϋ`�$.�����#�8X�W��f��.��i���3�'q�wqTU�	JU�     