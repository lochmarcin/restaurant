PGDMP         "                y        
   restaurant    13.2    13.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
   restaurant    TABLE     O  CREATE TABLE public.restaurant (
    id integer NOT NULL,
    user_id integer,
    name character varying,
    description character varying,
    category character varying,
    nip character varying,
    phone character varying,
    city character varying NOT NULL,
    street character varying,
    apart_number character varying
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
            public          postgres    false    202            �            1259    49171    tables    TABLE     �   CREATE TABLE public.tables (
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
            public          postgres    false    204            �            1259    40965    users    TABLE     X  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    email character varying,
    google_id character varying,
    fb_id character varying,
    role integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    40968    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    200            �          0    40979 
   restaurant 
   TABLE DATA           v   COPY public.restaurant (id, user_id, name, description, category, nip, phone, city, street, apart_number) FROM stdin;
    public          postgres    false    202   p       �          0    49171    tables 
   TABLE DATA           D   COPY public.tables (id, id_rest, numb_seats, image_url) FROM stdin;
    public          postgres    false    204   �       �          0    40965    users 
   TABLE DATA           `   COPY public.users (id, name, email, google_id, fb_id, role, created_at, updated_at) FROM stdin;
    public          postgres    false    200   �       �           0    0    restaurant_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.restaurant_id_seq', 1, true);
          public          postgres    false    203            �           0    0    tables_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.tables_id_seq', 8, true);
          public          postgres    false    205            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 8, true);
          public          postgres    false    201            �   S   x�3���L)-H
%�
U�Y�I��%�
E�@��(19+Q�3�����ļTNC#cS3sKNsΪD���T\1z\\\ ���      �   �   x��ҽN�0�:~G�]��WBw4h%���K��ޟp�P�]�|�,4иF�2��Tf��L��P )��'�l���X�*�6~�>��.w�G�1�5Ɍ���laE������@�"8��)3eW���e���;��Nk�)M��,r?���$��!��ȱ~�"h�atD��4bȿ�w�
d�|�1�)�E{������Em������I��n��?�P��eX���K�L�����	��6'�UJ}E*��      �   �   x�}�=�0����Q-�$����	�T�RC%n��)b)HHo�߳���Nӽ̷��X�Ս�M2��X2��Lm��z=YǜQ2X
&|@��z�C�{���,�K���Z!�ġ}�"1�r��J{ �,h����~���y5�     