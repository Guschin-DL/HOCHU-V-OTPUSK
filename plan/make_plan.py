"""ПВЗ Ozon, заявка 544512 (Шеверняево, Северная ул., 30).
План помещения по эскизу + расстановка мебели по Руководству по брендингу Ozon v36.
Все размеры в метрах. Ось y направлена вниз. Размеры сняты с рукописного эскиза (он не в масштабе),
поэтому их нужно проверить рулеткой: меняйте числа в блоке PARAMS и запускайте скрипт заново.
"""
import math
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
from matplotlib.patches import Rectangle, Circle, Arc, Polygon

# ---------------- PARAMS (по эскизу) ----------------
A, B, C = 2.10, 2.74, 2.20      # просветы между простенками по фасадной стене
T = 0.20                        # толщина простенков/стен
F1, F2 = 2.50, 2.30             # вылет простенков от фасадной стены
D = 6.00                        # глубина основного зала (левая стена)
ALC = 5.30                      # глубина «кармана» (чистая)
STRIP = 0.70                    # нижний выступ справа (оценка)
W = A + T + B + T + C           # ширина зала
X1, X2 = A + T, A + T + B       # внутренние грани кармана 2.30 / 5.04
PART_Y = 3.9                    # новая перегородка склада
DOOR = (0.80, 1.70)             # дверь из тамбура
WALL = "#3a3a3a"
NEW = "#e07b00"


def room_polygon():
    return [(0, 0), (W, 0), (W, D + STRIP), (X2 + T, D + STRIP), (X2 + T, D), (X2, D),
            (X2, D + ALC), (X1, D + ALC), (X1, D), (0, D)]


def rect(ax, x, y, w, h, fc, ec="k", lw=0.8, z=3, **kw):
    ax.add_patch(Rectangle((x, y), w, h, fc=fc, ec=ec, lw=lw, zorder=z, **kw))


def txt(ax, x, y, s, fs=7, c="k", ha="center", va="center", z=10, **kw):
    ax.text(x, y, s, fontsize=fs, color=c, ha=ha, va=va, zorder=z, **kw)


def dim(ax, x1, y1, x2, y2, label, fs=7, c="#0b3d91"):
    ax.annotate("", (x1, y1), (x2, y2), arrowprops=dict(arrowstyle="<->", color=c, lw=0.8), zorder=9)
    if not label:
        return
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    if abs(y2 - y1) < abs(x2 - x1):
        ax.text(mx, my - 0.17, label, fontsize=fs, color=c, ha="center", va="center", zorder=10,
                bbox=dict(fc="white", ec="none", pad=0.6))
    else:
        ax.text(mx - 0.17, my, label, fontsize=fs, color=c, rotation=90, ha="center", va="center", zorder=10,
                bbox=dict(fc="white", ec="none", pad=0.6))


def base(ax):
    ax.set_aspect("equal")
    ax.set_xlim(-3.6, 8.2)
    ax.set_ylim(12.2, -2.7)
    ax.axis("off")
    # пол
    ax.add_patch(Polygon(room_polygon(), fc="#f3f1ec", ec="none", zorder=1))
    # тамбур (вне площади)
    rect(ax, -3.1, -2.1, 5.4, 2.1, "#e6e6e6", ec="#888", lw=0.8, z=1, hatch="///")
    txt(ax, -0.4, -1.05, "ТАМБУР 5,40 × 2,10\n(не входит в площадь)", 7, "#555")
    # соседи
    rect(ax, -3.6, 0, 3.4, 11.5, "#f0f0f0", ec="none", z=0, hatch="\\\\")
    txt(ax, -1.9, 4, "СКЛАД (соседнее\nпомещение) /\nулица + парковка", 7, "#777")
    rect(ax, X2 + T, D + STRIP + T, W - X2 - T + T, 1.8, "#f0f0f0", ec="#aaa", z=0)
    txt(ax, 6.4, 7.9, "кабинет (столовая)\nвне ПВЗ", 6.5, "#777")
    txt(ax, 1.05, 6.9, "помещения вне ПВЗ", 6.5, "#777")
    # стены
    for (x, y, w, h) in [(-T, -T, W + 2 * T, T),                 # фасадная
                         (-T, 0, T, D + T),                      # левая
                         (W, 0, T, D + STRIP + T),               # правая
                         (X2 + T, D + STRIP, W - X2 - T + T, T),  # низ выступа
                         (-T, D, A + T + T, T),                  # низ кармана слева
                         (A, D, T, ALC + T), (X2, D, T, ALC + T),  # стены склада-кармана
                         (A, D + ALC, B + 3 * T, T),
                         (A, 0, T, F1), (X2, 0, T, F2)]:         # простенки
        rect(ax, x, y, w, h, WALL, ec=WALL, z=4)
    # окна и дверь
    rect(ax, 3.15, -T, 1.2, T, "#9fd3ff", ec="#1565c0", z=5)
    txt(ax, 3.75, -0.45, "окно", 6.5, "#1565c0")
    rect(ax, W, 4.35, T, 0.95, "#9fd3ff", ec="#1565c0", z=5)
    txt(ax, W + 0.55, 4.83, "окно", 6.5, "#1565c0", rotation=90)
    rect(ax, DOOR[0], -T, DOOR[1] - DOOR[0], T, "white", ec="white", z=5)
    ax.add_patch(Arc((DOOR[0], 0), 1.8, 1.8, theta1=270, theta2=360, ec="#888", lw=0.6, ls="--", zorder=6))
    ax.plot([DOOR[0], DOOR[0]], [0, -0.9], color="#555", lw=1.2, zorder=6)
    txt(ax, 1.25, -0.5, "ВХОД\n(дверь наружу,\nв тамбур)", 6, "#b00020")
    ax.annotate("", (1.25, 0.55), (1.25, -0.1), arrowprops=dict(arrowstyle="->", color="#b00020", lw=1.2), zorder=9)


def page_plan(pdf, png):
    fig, ax = plt.subplots(figsize=(11.7, 16.5))
    base(ax)
    # размеры
    dim(ax, 0, 0.35, A, 0.35, "2,10")
    dim(ax, X1, 0.35, X2, 0.35, "2,74")
    dim(ax, X2 + T, 0.35, W, 0.35, "2,20")
    dim(ax, -0.5, 0, -0.5, D, "6,00")
    dim(ax, 2.0, 0.0, 2.0, F1, "2,5", c="#555")
    dim(ax, 5.35, 0.0, 5.35, F2, "2,3", c="#555")
    dim(ax, X1, 9.0, X2, 9.0, "2,7")
    dim(ax, X1 - 0.35, D, X1 - 0.35, D + ALC, "5,3")
    dim(ax, X2 + T, D + STRIP + 0.4, W, D + STRIP + 0.4, "2,2")
    dim(ax, W + 0.6, D, W + 0.6, D + STRIP, "~0,7", c="#b00020")
    dim(ax, 0, -2.45, W, -2.45, "ширина зала 7,44 (расчёт)")
    txt(ax, 3.7, 1.4, "ЗАЛ", 12, "#999")
    txt(ax, 3.7, 8.5, "«КАРМАН»", 12, "#999")
    txt(ax, 6.4, 6.35, "выступ", 7, "#999")
    txt(ax, 1.05, 5.0, "левый\nнижний угол", 7, "#999")
    main = W * D - T * F1 - T * F2
    strip = C * STRIP
    alc = B * ALC
    total = main + strip + alc
    ax.set_title("Заявка 544512 · Шеверняево, Северная ул., 30 — ПЛАН ПОМЕЩЕНИЯ по эскизу (красный контур)\n"
                 f"Площадь ПВЗ без тамбура ≈ {total:.1f} м² (зал {main:.1f} + карман {alc:.1f} + выступ {strip:.1f})",
                 fontsize=11, loc="left")
    fig.text(0.02, 0.012, "Эскиз нарисован не в масштабе: за основу взяты подписанные размеры. Проверьте рулеткой "
             "(особенно 6,0 · 5,3 · 0,7 м и положение окон).", fontsize=8, color="#555")
    pdf.savefig(fig); fig.savefig(png, dpi=130); plt.close(fig)
    return total, main, alc, strip


def furniture(ax):
    # ----- новые перегородки склада -----
    for (x, y, w, h) in [(A, PART_Y, T, D - PART_Y), (X2, PART_Y, T, D - PART_Y)]:
        rect(ax, x, y, w, h, NEW, ec=NEW, z=4)
    rect(ax, X1, PART_Y, B, 0.1, NEW, ec=NEW, z=4)
    # проём склада в западной стене (дверь 0.95)
    rect(ax, A - 0.02, 5.0, T + 0.04, 0.95, "white", ec="white", z=5)
    ax.add_patch(Arc((X1, 5.95), 1.9, 1.9, theta1=270, theta2=360, ec="#555", lw=0.7, ls="--", zorder=6))
    ax.plot([X1, X1 + 0.95], [5.95, 5.95], color="#555", lw=1.2, zorder=6)
    txt(ax, 1.75, 5.5, "дверь\nна склад\n0,95", 6, "#555")
    # зона склада
    rect(ax, X1, PART_Y + 0.1, B, D + ALC - PART_Y - 0.1, "#d6ecf7", ec="none", z=2)
    txt(ax, 3.67, 9.5, "СКЛАД\n20,0 м²", 11, "#1b6f99")
    # ----- стеллажи 1000×400 -----
    sh = []
    sh.append((X1, 4.0, 0.4, 1.0, False))
    sh += [(X1, 6.05 + i * 1.0, 0.4, 1.0, False) for i in range(5)]
    sh += [(X2 - 0.4, 4.0 + i * 1.0, 0.4, 1.0, i >= 3) for i in range(7)]
    sh.append((3.64, 4.0, 1.0, 0.4, False))
    sh.append((2.70, 10.9, 1.0, 0.4, False))
    for (x, y, w, h, seller) in sh:
        rect(ax, x, y, w, h, "#ffd54f" if seller else "#b0bec5", ec="#37474f", lw=0.7, z=6)
    txt(ax, X2 - 0.2, 7.5, "товары\nпродавцов", 5.5, "#6d4c00", rotation=90, z=11)
    rect(ax, 2.75, 4.1, 0.9, 0.85, "#efebe9", ec="#6d4c00", lw=0.6, z=6, ls="--")
    txt(ax, 3.2, 4.5, "тарные\nящики", 5.5)
    rect(ax, 3.75, 10.4, 0.85, 0.85, "#efebe9", ec="#6d4c00", lw=0.6, z=6, ls="--")
    txt(ax, 4.18, 10.82, "инвентарь\n(швабра,\nпылесос)", 5)
    txt(ax, 3.67, 8.0, "проход 1,94 м", 6.5, "#0b3d91", rotation=90)
    # ----- ресепшен -----
    rect(ax, 0, 4.4, 0.9, 0.6, "#ffffff", ec="k", lw=1.2, z=7)
    txt(ax, 0.45, 4.7, "стойка\n0,9×0,6", 5.5)
    rect(ax, 0, 5.0, 0.5, 0.6, "#ffffff", ec="k", lw=1.2, z=7)
    txt(ax, 0.25, 5.3, "прист.\n0,5×0,6", 5)
    ax.add_patch(Circle((0.95, 5.45), 0.23, fc="#7b1f3a", ec="k", zorder=7))
    txt(ax, 1.4, 4.75, "проход\nоператора 1,2", 5.5, "#0b3d91")
    # ----- стол проверки -----
    rect(ax, 0, 2.3, 0.6, 1.0, "#ffffff", ec="k", lw=1.2, z=7)
    txt(ax, 0.3, 2.8, "стол\nпроверки\n1×0,6", 5, rotation=90)
    rect(ax, 0, 1.3, 0.6, 1.0, "none", ec="#777", lw=0.9, z=7, ls="--")
    txt(ax, 0.3, 1.8, "2-й стол\n(опц.)", 5, "#777", rotation=90)
    txt(ax, 0.05, 3.55, "розетка 220 В", 5.5, "#b00020", ha="left")
    # ----- примерочные (двойной комплект 2×1,22 × 1,2) -----
    rect(ax, 6.24, 0.30, 1.2, 2.44, "#ffffff", ec="k", lw=1.2, z=7)
    ax.plot([6.24, 7.44], [1.52, 1.52], color="k", lw=0.8, zorder=8)
    ax.plot([6.24, 6.24], [0.30, 2.74], color="#333", lw=2.5, zorder=8)
    txt(ax, 6.85, 0.91, "примерочная 1\n1,22×1,2", 5.5, z=11)
    txt(ax, 6.85, 2.13, "примерочная 2\n1,22×1,2", 5.5, z=11)
    rect(ax, 5.34, 0.30, 0.9, 2.44, "#dbe9ff", ec="none", z=2)
    txt(ax, 5.8, 1.5, "подход\n≥ 0,9", 5.5, "#0b3d91")
    # ----- скамейка + зеркало -----
    rect(ax, 5.50, 6.32, 0.78, 0.38, "#9e9e9e", ec="k", lw=0.8, z=7)
    txt(ax, 5.89, 6.0, "скамья 0,78×0,38", 5.5)
    rect(ax, 7.34, 5.45, 0.10, 0.8, "#cfe8ff", ec="k", lw=0.8, z=7)
    txt(ax, 7.05, 5.9, "зерк.\n0,8", 5, rotation=90)
    # дверь в кабинет
    rect(ax, 6.7, D + STRIP - 0.01, 0.6, T + 0.02, "white", ec="white", z=5)
    txt(ax, 6.65, 7.3, "дверь в кабинет\n(для персонала)", 5.5, "#555")
    # ----- брендинг -----
    rect(ax, 0.3, D - 0.07, 1.5, 0.07, "#e91e8c", ec="none", z=7)
    txt(ax, 1.05, 5.8, "обои «Зебра»\n+ лого", 5.5, "#e91e8c", z=11)
    rect(ax, W - 0.07, 2.9, 0.07, 1.3, "#7e57c2", ec="none", z=7)
    txt(ax, 7.1, 3.6, "обои\n«Баллон»", 5.5, "#7e57c2", rotation=90)
    rect(ax, 0, 2.3, 0.05, 1.0, "#e91e8c", ec="none", z=8)
    # ----- камеры -----
    for (x, y, s) in [(3.4, 3.1, "камера\nзал"), (3.67, 7.4, "камера\nсклад")]:
        ax.add_patch(Circle((x, y), 0.14, fc="#d32f2f", ec="k", zorder=8))
        txt(ax, x + 0.5, y, s, 5, "#d32f2f", ha="left")
    # ----- размеры правил -----
    dim(ax, 1.25, 0.0, 1.25, 4.4, "до стойки 4,4 м (≥1,5)", c="#2e7d32")
    dim(ax, 0.6, 3.3, 0.6, 4.4, "1,1", c="#2e7d32")
    dim(ax, 2.30, 2.5, 2.30, PART_Y, "", c="#2e7d32")
    txt(ax, 3.05, 3.3, "проход в зал 1,4 м", 5.5, "#2e7d32")
    # зоны
    txt(ax, 3.7, 1.15, "ЗОНА РЕШЕНИЯ\nсвободно", 8, "#999")


def page_furn(pdf, png, total):
    fig, ax = plt.subplots(figsize=(11.7, 16.5))
    base(ax)
    furniture(ax)
    ax.set_title("Заявка 544512 · Шеверняево, Северная ул., 30 — РАССТАНОВКА МЕБЕЛИ (формат L, ≥ 40 м²)\n"
                 "Оранжевое — новые перегородки склада",
                 fontsize=11, loc="left")
    part = 0.2 * (D - PART_Y) * 2 + 0.1 * B
    client = total - B * (D + ALC - PART_Y - 0.1) - part
    fig.text(0.02, 0.012, f"Всего ≈ {total:.1f} м² · склад ≈ 20,0 м² (норма L: ≥ 20) · клиентская зона ≈ {client:.1f} м² (≥ 20) · "
             "стеллажей 15 (рекомендовано для L: от 17) · примерочных 2 · проходы ≥ 0,9 м", fontsize=8, color="#333")
    pdf.savefig(fig); fig.savefig(png, dpi=130); plt.close(fig)
    return client


if __name__ == "__main__":
    import os
    here = os.path.dirname(os.path.abspath(__file__))
    with PdfPages(os.path.join(here, "PVZ_544512_plan.pdf")) as pdf:
        total, *_ = page_plan(pdf, os.path.join(here, "1_plan_pomeshcheniya.png"))
        client = page_furn(pdf, os.path.join(here, "2_rasstanovka_mebeli.png"), total)
    print(f"total={total:.1f} client={client:.1f}")
