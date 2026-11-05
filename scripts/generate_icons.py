import os
from PIL import Image

out_dir = r'c:\Users\Ian Talbert\Documents\personal\ian-talbert-website\public\icons'
os.makedirs(out_dir, exist_ok=True)

# Palette matching site theme (warm ivory, charcoal, antique crimson, gold)
palette = {
    '.': (0, 0, 0, 0),          # Transparent
    'K': (26, 24, 21, 255),      # Charcoal ink
    'D': (65, 56, 48, 255),      # Dark feather charcoal
    'B': (135, 110, 85, 255),    # Warm brown feather
    'W': (250, 246, 238, 255),   # Aged book page ivory
    'G': (218, 208, 192, 255),   # Page shadow
    'R': (140, 39, 30, 255),     # Venetian bookcloth crimson
    'C': (95, 28, 22, 255),      # Deep crimson shadow
    'Y': (225, 165, 45, 255),    # Golden beak / amber eyes
    'E': (255, 245, 210, 255),   # Eye sclera
    'O': (175, 125, 35, 255),    # Shaded gold
}

# --- CANDIDATE 1: Classic Owl Perched on Open Book ---
# Expressive tufted owl with golden beak and open book pages below
c1_art = [
    "..B..........B..",
    ".BDB........BDB.",
    ".BDDB......BDDB.",
    ".BDDDDDDDDDDDDB.",
    ".DDEEDE..EDEEDD.",
    ".DEKEEDEEDEKEED.",
    ".DEKEEDEEDEKEED.",
    ".DDEEDYYYYDEEDD.",
    "..DDDYYYYYYDDD..",
    "...DDDYYYYDDD...",
    ".....YY..YY.....",  # claws on book
    "...WWWWKKWWWW...",  # open book crease
    "..WWWWWWWWWWWW..",  # open pages
    "..GGWWWWWWWWGG..",  # book page thickness
    ".CRRRRRRRRRRRRC.",  # crimson book cover
    "..CC........CC.."   # cover corners
]

# --- CANDIDATE 2: Owl on Gilded Leatherbound Tome ---
# Owl sitting on a thick red leather book with gold gilded edges
c2_art = [
    "..D..........D..",
    ".DDD........DDD.",
    ".DDDDDDDDDDDDDD.",
    ".DDEEDE..EDEEDD.",
    ".DEKEEDEEDEKEED.",
    ".DDEEDYYYYDEEDD.",
    "..DDDYYYYYYDDD..",
    "..BDDDDDDDDDDB..",
    ".BBDDDDDDDDDDBB.",
    "...YY.YYYY.YY...",  # feet on book
    ".KRRRRRRRRRRRRK.",  # top leather rim
    ".KROOOOOOOOOORK.",  # gilded page block
    ".KRYYYYYYYYYYRK.",  # gleaming gold pages
    ".KRRRRRRRRRRRRK.",  # bottom leather rim
    "..KKKKKKKKKKKK..",  # shadow
    "................"
]

# --- CANDIDATE 3: Scholarly Spectacled Owl ---
# Round inquisitive spectacle eyes over open codex
c3_art = [
    ".D............D.",
    ".DDD........DDD.",
    ".DDDDDDDDDDDDDD.",
    "DDKKKKK..KKKKKDD",  # spectacles top frame
    "DDKEEEK..KEEEKDD",  # round lens glass
    "DDKKKEK..KKKEKDD",  # dark pupils looking forward
    "DDKEEEKKKKEEEKDD",  # lower frame & bridge
    ".DDKKKYYYYKKDD..",  # beak
    "..DDDDYYYYDDDD..",  # chin
    "...DDDDDDDDDD...",  # breast
    ".....YY..YY.....",  # talons
    "...WWWW..WWWW...",  # open folio pages
    "..WWWWWWWWWWWW..",
    "..GGWWWWWWWWGG..",
    ".CRRRRRRRRRRRRC.",  # binding
    "................"
]

# --- CANDIDATE 4: Compact Silhouette Owl Icon ---
# Ultra-high contrast at 16x16: clear silhouette with glowing amber eyes on open book
c4_art = [
    "..K..........K..",
    ".KKK........KKK.",
    ".KKKKKKKKKKKKKK.",
    ".KKYEYK..KYEYKK.",
    ".KYOYEY..KYOYEY.",  # amber glowing eyes
    ".KKYEYYYYYEYKK..",
    "..KKKYYYYYYKK...",  # beak
    "..KKKKKKKKKKKK..",  # chest
    "...KK.YYYY.KK...",  # perch claws
    "..WWWWKKKKWWWW..",  # book spine crease
    ".WWWWWWWWWWWWWW.",  # wide book leaf
    ".GGWWWWWWWWWWGG.",  # page edge
    "KRRRRRRRRRRRRRRK",  # red binding
    ".CC..........CC.",
    "................",
    "................"
]

candidates = [
    ('candidate_1_open_book_owl', 'Classic Owl Perched on Open Book', c1_art),
    ('candidate_2_gilded_tome_owl', 'Owl on Gilded Leatherbound Tome', c2_art),
    ('candidate_3_spectacled_owl', 'Scholarly Spectacled Owl', c3_art),
    ('candidate_4_silhouette_codex', 'High-Contrast Silhouette on Book', c4_art)
]

for slug, label, art in candidates:
    im16 = Image.new('RGBA', (16, 16), (0, 0, 0, 0))
    for y, row in enumerate(art):
        row_str = row.ljust(16, '.')[:16]
        for x, char in enumerate(row_str):
            color = palette.get(char, (0, 0, 0, 0))
            im16.putpixel((x, y), color)
    
    # Save 16x16 PNG
    p16 = os.path.join(out_dir, f'{slug}_16.png')
    im16.save(p16)
    
    # Save 32x32 PNG
    im32 = im16.resize((32, 32), Image.Resampling.NEAREST)
    p32 = os.path.join(out_dir, f'{slug}_32.png')
    im32.save(p32)
    
    # Save 64x64 PNG
    im64 = im16.resize((64, 64), Image.Resampling.NEAREST)
    p64 = os.path.join(out_dir, f'{slug}_64.png')
    im64.save(p64)

    # Save 128x128 preview PNG
    im128 = im16.resize((128, 128), Image.Resampling.NEAREST)
    p128 = os.path.join(out_dir, f'{slug}_128.png')
    im128.save(p128)

    # Save ICO containing 16x16 and 32x32
    pico = os.path.join(out_dir, f'{slug}.ico')
    im16.save(pico, format='ICO', sizes=[(16, 16), (32, 32)])

    print(f'Done: {slug}')

print('All candidates generated successfully in:', out_dir)
