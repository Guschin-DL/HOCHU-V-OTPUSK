"""ПВЗ Ozon, заявка 544512 — эскиз №2 (замысел расстановки) + экспертная проверка + рекомендуемый вариант.
Размеры в метрах, ось y вниз, начало — внутренний угол левой стены и фасада.
Эскиз нарисован не в масштабе — геометрия строится по подписям (м), положения без подписи — оценка."""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
from matplotlib.patches import Rectangle, Circle, Arc
from make_plan import rect, txt, dim, WALL, NEW

# ---- размеры с эскиза ----
A, B, C = 2.10, 2.70, 2.20       # ниши по фасаду
F1, F2 = 2.50, 2.30              # простенки (2,50 / 2,30)
HALL_W, HALL_H = 4.80, 2.80      # зал 4,80 × 2,80
LEFT_L, ALC_L = 5.80, 5.30       # левая колонка / карман
H1, H2 = F1, F1 + HALL_H         # линии: 2,5 и 5,3
YB_L, YB_A = H2 + LEFT_L, H2 + ALC_L   # низ левой колонки 11,1 / кармана 10,6
RW = A + B + C                   # правая стена x = 7,0
T = 0.10


def wall(ax, x, y, w, h, c=WALL):
    rect(ax, x, y, w, h, c, ec=c, z=4)


def structure(ax, title, sub):
    ax.set_aspect("equal"); ax.set_xlim(-4.3, 8.3); ax.set_ylim(13.4, -3.3); ax.axis("off")
    # контекст
    rect(ax, -3.3, 0, 3.3, YB_L, "#f0f0f0", ec="#999", lw=0.8, z=0, hatch="\\\\\\\\")
    txt(ax, -1.65, 6.0, "СКЛАД\n(соседнее\nпомещение)", 10, "#666", bbox=dict(fc="white", ec="none", pad=2))
    ax.text(-3.85, 4.0, "УЛИЦА + ПАРКОВКА", fontsize=10, color="#666", rotation=90, ha="center", va="center")
    rect(ax, -3.3, -2.1, 5.4, 2.1, "#e6e6e6", ec="#888", lw=0.8, z=1, hatch="///")
    txt(ax, -0.7, -1.5, "ТАМБУР", 12, "#444", bbox=dict(fc="white", ec="none", pad=2))
    # полы
    rect(ax, 0, 0, HALL_W, YB_A, "#f6f4ef", ec="none", z=1)
    rect(ax, 0, H2, A, LEFT_L, "#f6f4ef", ec="none", z=1)
    rect(ax, HALL_W, 0, C + B - B, H2, "#fafafa", ec="none", z=1)
    rect(ax, HALL_W, H2, RW - HALL_W, 5.3, "#eeeeee", ec="none", z=1, hatch="..")
    txt(ax, 5.9, 8.0, "не размечено на эскизе\n(правая часть, 2,20:\nранее — выступ, кабинет\n(столовая), котельная)", 7, "#777")
    # стены
    wall(ax, -T, -T, RW + 2 * T, T)                          # фасад
    wall(ax, -T, 0, T, YB_L + T)                             # левая
    wall(ax, RW, 0, T, H2 + 5.3)                             # правая
    wall(ax, A - T / 2, 0, T, F1)                            # простенок 2,50
    wall(ax, HALL_W - T / 2, 0, T, F2)                       # простенок 2,30
    wall(ax, HALL_W - T / 2, H1, T, HALL_H)                  # правая граница зала
    wall(ax, 0, YB_L, A + T, T)                              # низ левой колонки
    wall(ax, A, YB_A, HALL_W - A + T / 2, T)                 # низ кармана
    wall(ax, A - T / 2, H2, T, YB_A - H2)                    # стена левая колонка | карман
    wall(ax, HALL_W - T / 2, H2, T, YB_A - H2)               # правая стена кармана
    # окна
    rect(ax, 3.2, -0.12, 0.7, 0.14, "#9fd3ff", ec="#1565c0", z=5); txt(ax, 3.55, -0.45, "окно", 7, "#1565c0")
    rect(ax, RW - 0.02, 3.2, 0.14, 0.7, "#9fd3ff", ec="#1565c0", z=5)
    rect(ax, RW - 0.02, 7.0, 0.14, 0.7, "#9fd3ff", ec="#1565c0", z=5)
    ax.text(RW + 0.45, 3.55, "окно", fontsize=7, color="#1565c0", rotation=90, ha="center", va="center")
    ax.text(RW + 0.45, 7.35, "окно", fontsize=7, color="#1565c0", rotation=90, ha="center", va="center")
    # вход с улицы и дверь ПВЗ
    rect(ax, 0.95, -0.14, 0.9, 0.18, "white", ec="white", z=5)
    ax.plot([0.95, 1.55], [0, -0.6], color="#333", lw=1.4, zorder=6)
    ax.plot([-3.3, -3.3], [-1.9, -0.9], color="white", lw=4, zorder=5)
    ax.plot([-3.3, -2.7], [-0.9, -1.5], color="#333", lw=1.4, zorder=6)
    ax.plot([-3.3, 1.4], [-1.05, -1.05], color="#d32f2f", lw=1.2, ls="--", zorder=8)
    ax.annotate("", (1.4, 0.45), (1.4, -1.05), arrowprops=dict(arrowstyle="->", color="#d32f2f", lw=1.2, ls="--"), zorder=8)
    txt(ax, -1.2, -0.72, "вход с улицы", 7, "#d32f2f")
    # размеры с эскиза
    dim(ax, -3.3, -2.45, 2.1, -2.45, "5,40")
    dim(ax, 1.75, -2.1, 1.75, -0.12, "2,10")
    dim(ax, 0, 0.3, A, 0.3, "2,10")
    dim(ax, A, 0.3, A + B, 0.3, "2,70")
    dim(ax, HALL_W, 0.3, RW, 0.3, "2,20")
    dim(ax, 1.95, 0, 1.95, F1, "2,50", c="#555")
    dim(ax, 4.95, 0, 4.95, F2, "2,30", c="#555")
    dim(ax, 0, 2.38, HALL_W, 2.38, "4,80")
    dim(ax, -0.35, H1, -0.35, H2, "2,80")
    dim(ax, HALL_W + 0.3, H1, HALL_W + 0.3, H2, "2,80", c="#555")
    dim(ax, -0.35, H2, -0.35, YB_L, "5,80")
    dim(ax, HALL_W + 0.3, H2, HALL_W + 0.3, YB_A, "5,30")
    dim(ax, 0, YB_L + 0.3, A, YB_L + 0.3, "2,10")
    dim(ax, A, YB_A + 0.3, HALL_W, YB_A + 0.3, "2,70")
    ax.set_title(title + "\n" + sub, fontsize=11, loc="left")


def doors_common(ax, h1_open):
    # штора / проём из зала в левую колонку (H2)
    wall(ax, 0, H2 - T / 2, 1.2 if not h1_open else 0.8, T)
    wall(ax, 1.9 if not h1_open else 1.7, H2 - T / 2, A - (1.9 if not h1_open else 1.7), T)
    wall(ax, A, H2 - T / 2, HALL_W - A, T)
    x0, x1 = (1.2, 1.9) if not h1_open else (0.8, 1.7)
    ax.plot([x0, x1], [H2, H2], color="#7b1fa2", lw=3, ls=(0, (1, 1)), zorder=6)
    txt(ax, (x0 + x1) / 2, H2 + 0.22, "штора", 7, "#7b1fa2")
    # дверь в стене левая колонка | карман (Z, «КПТ»)
    rect(ax, A - 0.1, 6.4, 0.2, 0.8, "white", ec="white", z=5)
    ax.plot([A, A + 0.7], [6.4, 6.75], color="#333", lw=1.2, zorder=6)
    ax.text(A - 0.28, 6.8, "КПТ", fontsize=7, rotation=90, ha="center", va="center", zorder=10)
    # дверь «80» в правой границе зала
    rect(ax, HALL_W - 0.1, 4.5, 0.2, 0.8, "white", ec="white", z=5)
    ax.plot([HALL_W, HALL_W + 0.7], [4.5, 4.5], color="#333", lw=1.2, zorder=6)
    ax.text(HALL_W + 0.3, 4.95, "80", fontsize=7, rotation=90, ha="center", va="center", zorder=10)


def cams(ax, pts):
    for (x, y, s) in pts:
        ax.add_patch(Circle((x, y), 0.12, fc="#1a237e", ec="k", zorder=8))
        txt(ax, x + 0.18, y + 0.0, s, 6, "#1a237e", ha="left")


def shelf(ax, x, y, w, h, label="", fc="#b0bec5"):
    rect(ax, x, y, w, h, fc, ec="#37474f", lw=0.7, z=6)
    if label:
        ax.text(x + w / 2, y + h / 2, label, fontsize=5.5, ha="center", va="center", zorder=11,
                rotation=90 if h > w else 0)


def page_as_drawn(pdf, png):
    fig, ax = plt.subplots(figsize=(11.7, 16.5))
    structure(ax, "Заявка 544512 · эскиз №2 — КАК НАРИСОВАНО (все надписи сохранены)",
              "Геометрия по подписям; положение мебели — по рисунку (оценка). Тёмно-синие точки — «САМ» (камеры).")
    # H1: стена над залом
    wall(ax, A, H1 - T / 2, HALL_W - A, T)
    rect(ax, 1.16, H1 - 0.06, 0.9, 0.12, "white", ec="white", z=5)
    ax.plot([1.16, 1.9], [H1, H1 - 0.45], color="#333", lw=1.4, zorder=6)
    ax.plot([1.16, 2.06], [H1, H1], color="#555", lw=0.6, ls=":", zorder=6)
    doors_common(ax, False)
    # зал: стойка 90 + модуль 50, стул, обои, камера
    rect(ax, 0.55, 2.55, 0.6, 0.9, "white", ec="k", lw=1.2, z=7); txt(ax, 0.85, 3.0, "90", 7, rotation=90)
    rect(ax, 0.55, 3.45, 0.6, 0.5, "white", ec="k", lw=1.2, z=7); txt(ax, 0.85, 3.7, "50", 7, rotation=90)
    ax.add_patch(Circle((0.3, 2.95), 0.15, fc="#7b1f3a", ec="k", zorder=7)); txt(ax, 0.3, 3.3, "стул", 6)
    rect(ax, 0, 2.7, 0.07, 1.3, "#e91e8c", ec="none", z=7)
    ax.text(0.22, 3.9, "обои", fontsize=7, color="#e91e8c", rotation=90, ha="center", va="center", zorder=10)
    rect(ax, 2.45, 2.55, 1.0, 0.45, "white", ec="k", lw=1.2, z=7); txt(ax, 2.95, 2.78, "100", 7)
    shelf(ax, 4.3, 2.65, 0.5, 0.95, "100"); shelf(ax, 4.3, 3.6, 0.5, 0.95, "100")
    ax.plot([0.3, 1.5], [3.15, 5.25], color="#555", lw=0.8, ls="--", zorder=6)     # путь оператора к шторе
    ax.plot([1.35, 1.35], [0.5, 2.5], color="#d32f2f", lw=1.0, ls="--", zorder=6)
    ax.plot([1.35, 1.7], [2.5, 5.25], color="#d32f2f", lw=1.0, ls="--", zorder=6)
    # обои 2,70 на стене кармана
    rect(ax, 2.7, H2 - 0.04, 0.8, 0.08, "#e91e8c", ec="none", z=7)
    txt(ax, 3.1, H2 + 0.22, "обои 2,70", 7, "#e91e8c")
    # левая колонка: стол приёма + ячейки, паллет, изделие «2,80»
    rect(ax, 0, H2 + 0.1, 0.55, 1.5, "white", ec="k", lw=1.2, z=7)
    ax.text(0.28, H2 + 0.85, "СТОЛ ПРИЁМА", fontsize=6.5, rotation=90, ha="center", va="center", zorder=11)
    for i in range(5):
        shelf(ax, 0, H2 + 1.6 + i * 0.52, 0.55, 0.52)
    rect(ax, 0.02, 9.55, 0.5, 1.5, "#fff3e0", ec="k", lw=1.0, z=7)
    ax.text(0.28, 10.3, "«…3 …холод…»\n(не разобрано)", fontsize=5, rotation=90, ha="center", va="center", zorder=11)
    ax.text(-0.18, 10.3, "2,80", fontsize=6.5, rotation=90, ha="center", va="center", zorder=11, color="#0b3d91")
    for i in range(4):
        shelf(ax, 1.6, 7.3 + i * 0.5, 0.5, 0.5)
    rect(ax, 1.55, 9.45, 0.5, 1.6, "#efebe9", ec="k", lw=1.0, z=7, ls="--")
    ax.text(1.8, 10.25, "паллет разборный", fontsize=6, rotation=90, ha="center", va="center", zorder=11)
    # карман: стеллажи 50×100
    for i in range(5):
        shelf(ax, 4.3, 5.9 + i * 0.94, 0.5, 0.94, "100")
    for i in range(4):
        shelf(ax, 3.2, 7.2 + i * 0.85, 0.5, 0.85, "100")
    for i in range(3):
        shelf(ax, 2.2, 8.2 + i * 0.8, 0.5, 0.8, "100")
    txt(ax, 3.5, 6.2, "СТЕЛЛАЖИ 50×100", 8, "#555")
    cams(ax, [(0.1, 2.6, "САМ"), (0.1, H2, "САМ"), (HALL_W - 0.05, H2, "САМ"), (2.2, YB_A - 0.05, "САМ")])
    txt(ax, 2.9, 4.1, "ЗАЛ 4,80 × 2,80", 9, "#999")
    txt(ax, 1.0, 1.5, "ниша A\n2,10 × 2,50", 8, "#999")
    txt(ax, 3.4, 1.5, "ниша B 2,70 × 2,50\n(стена H1 снизу)", 8, "#999")
    fig.text(0.02, 0.012, "Не разобрано на эскизе: надпись у нижнего левого элемента («…3 …холод…»), «КПТ» (так и оставил), "
             "«2,30» или «2,40» у правого простенка, что за «100» у стены H1.", fontsize=8, color="#b00020")
    pdf.savefig(fig); fig.savefig(png, dpi=130); plt.close(fig)


def page_review(pdf, png):
    fig = plt.figure(figsize=(11.7, 16.5))
    ax = fig.add_axes([0.06, 0.04, 0.88, 0.92]); ax.axis("off")
    rows = [
     ("Экспертная проверка эскиза №2 по Руководству Ozon (v.36)", 18, "b"),
     ("Заявка 544512 · Шеверняево, Северная ул., 30", 11, "g"),
     ("", 6, ""),
     ("Площади (по подписям)", 13, "b"),
     ("• Зал 4,80×2,80 = 13,4 м² · ниша A 2,10×2,50 = 5,25 · ниша B 2,70×2,50 = 6,75", 10, ""),
     ("• Левая колонка 2,10×5,80 = 12,2 м² · карман 2,70×5,30 = 14,3 м² → склад-зона 26,5 м²", 10, ""),
     ("• Итого, если ПВЗ = зал + левая колонка + карман: 39,9 м²; + ниша A = 45,1; + ниша B = 51,9 м²", 10, ""),
     ("", 6, ""),
     ("Нарушения и риски (по убыванию важности)", 13, "r"),
     ("1. НЕТ ПРИМЕРОЧНЫХ. Нужно минимум 2 (комплект 2×1,22×1,2 м). Единственное подходящее место — ниша B (2,70 м ≥ 2,44 м):", 10, "r"),
     ("    Ozon допускает «примерочные в нише». Для этого стену H1 над нишей B нужно убрать, окно изнутри закрыть блоком.", 9, ""),
     ("2. СТОЙКА У ВХОДА. От двери H1 до стойки ≈ 0 м, нужно ≥ 1,5 м; очередь упирается в дверь и в зону решения (≥ 0,8 м).", 10, "r"),
     ("3. ПРОХОД ОПЕРАТОРА 0,7 м (между левой стеной и стойкой) — нужно ≥ 0,9 м; позади оператора 0,9–1,2 м не выдержано.", 10, "r"),
     ("4. ВХОД НА СКЛАД ЧЕРЕЗ ШТОРУ ≈ 0,7 м — нужно ≥ 0,9 м; лучше дверь, рядом с оператором. Нужна дверь и в стене H2.", 10, "r"),
     ("5. ПРОХОДЫ В КАРМАНЕ 0,57–0,65 м (стеллажи 0,5 м слева, «остров» и справа) — нужно ≥ 1,0 м. Остров убрать или сузить.", 10, "r"),
     ("6. КЛИЕНТСКАЯ ЗОНА: зал 13,4 м² < 17 м² (для формата M) / 20 м² (L). С нишей B — 20,2 м² ✓; с нишей A — 25,4 м².", 10, "r"),
     ("7. Глубина стеллажей 0,5 м: рекомендовано 1000/1200×400 мм. Стеллажи товаров продавцов — отдельно, в зоне камеры.", 10, ""),
     ("8. Стеллажи 2×(0,5×1,0) в клиентском зале у правой стены уменьшают просторную зону — лучше убрать на склад.", 10, ""),
     ("9. Стол «100» у стены H1: нужен проход ≥ 0,9 м со всех сторон и розетка 220 В; в эскизе проход слева 0,6 м.", 10, ""),
     ("", 6, ""),
     ("Что выполнено", 13, "b"),
     ("✓ Камеры: 4 шт. (минимум 2: зал и склад); не над примерочными. ✓ Стол приёма и склад отделены от клиентской зоны.", 10, ""),
     ("✓ Бренд-обои на стене у входа в карман; дверь 0,8 м из зала; запас по складу (26,5 м² при норме 20 для L).", 10, ""),
     ("", 6, ""),
     ("Следующая страница — рекомендуемая расстановка (вариант Г), исправляющая пп. 1–6 в тех же стенах.", 10, "g"),
    ]
    y = 1.0
    for t, fs, st in rows:
        col = {"b": "#0b3d91", "g": "#666", "r": "#b00020"}.get(st, "k")
        ax.text(0, y, t, fontsize=fs, color=col, fontweight="bold" if st in ("b",) and fs >= 13 else "normal", va="top")
        y -= fs * 0.0019 + 0.0085
    pdf.savefig(fig); fig.savefig(png, dpi=110); plt.close(fig)


def page_fixed(pdf, png):
    fig, ax = plt.subplots(figsize=(11.7, 16.5))
    structure(ax, "Заявка 544512 · ВАРИАНТ Г — рекомендуемая расстановка (те же стены, замечания эксперта учтены)",
              "Оранжевое — что нужно изменить в конструкции. Все проходы ≥ 0,9 м (клиентская зона) и ≥ 1,0 м (склад).")
    # H1: стена над нишей A остаётся только как короткая вставка; над нишей B — снята (ниша под примерочные)
    ax.plot([A, HALL_W], [H1, H1], color=NEW, lw=2.5, ls=(0, (2, 2)), zorder=6)
    txt(ax, 3.45, H1 + 0.18, "стена H1 над нишей B — снять", 6.5, NEW)
    doors_common(ax, True)
    # дверь склада 0,9 вместо шторы
    ax.plot([0.8, 1.7], [H2, H2], color="white", lw=4, zorder=7)
    ax.plot([0.8, 0.8], [H2, H2 + 0.9], color="#333", lw=1.3, zorder=8)
    ax.add_patch(Arc((0.8, H2), 1.8, 1.8, theta1=0, theta2=90, ec="#555", lw=0.7, ls="--", zorder=6))
    txt(ax, 1.3, H2 + 1.1, "дверь на склад 0,9\n(вместо шторы)", 6, "#555")
    # примерочные в нише B (двойной блок 2,44×1,2, шторы к залу)
    rect(ax, 2.28, 0.12, 2.44, 1.2, "white", ec="k", lw=1.3, z=7)
    ax.plot([3.5, 3.5], [0.12, 1.32], color="k", lw=0.8, zorder=8)
    ax.plot([2.28, 4.72], [1.32, 1.32], color="#333", lw=2.5, zorder=8)
    txt(ax, 2.89, 0.72, "примерочная 1\n1,22×1,2", 6, z=11); txt(ax, 4.11, 0.72, "примерочная 2\n1,22×1,2", 6, z=11)
    rect(ax, 2.28, 1.32, 2.44, 1.0, "#dbe9ff", ec="none", z=2); txt(ax, 3.5, 1.85, "подход 1,0+", 6.5, "#0b3d91")
    rect(ax, 3.2, -0.12, 0.7, 0.14, "#ffcc80", ec="#e65100", z=6)
    txt(ax, 3.55, -0.75, "окно закрывается блоком\n(матовая плёнка снаружи)", 5.5, "#e65100")
    # скамья + зеркало в нише A (зона ожидания)
    rect(ax, 0, 1.0, 0.38, 0.78, "#9e9e9e", ec="k", lw=0.8, z=7); txt(ax, 0.9, 1.4, "скамья\n0,78×0,38", 6)
    rect(ax, 0, 0.1, 0.1, 0.8, "#cfe8ff", ec="k", lw=0.8, z=7); txt(ax, 0.35, 0.5, "зерк.", 5.5)
    # обои Баллон на простенке 2,30 рядом с примерочными
    rect(ax, HALL_W - 0.17, 1.35, 0.07, 0.9, "#7e57c2", ec="none", z=7)
    ax.text(HALL_W - 0.3, 1.8, "Баллон", fontsize=5.5, color="#7e57c2", rotation=90, ha="center", va="center", zorder=10)
    # ресепшен: счётчик 0,9 + модуль 0,5, оператор позади 1,0 м, ограждение с востока
    rect(ax, 0, 3.7, 0.9, 0.6, "white", ec="k", lw=1.3, z=7); txt(ax, 0.45, 4.0, "стойка\n0,9×0,6", 6)
    rect(ax, 0.9, 3.7, 0.5, 0.6, "white", ec="k", lw=1.3, z=7); txt(ax, 1.15, 4.0, "прист.\n0,5", 5.5)
    ax.add_patch(Circle((0.45, 4.75), 0.2, fc="#7b1f3a", ec="k", zorder=7))
    ax.plot([2.1, 2.1], [4.3, H2], color="#555", lw=1.3, ls=":", zorder=7)
    txt(ax, 2.55, 4.85, "калитка/\nограждение", 5.5, "#555")
    dim(ax, 0.0, 4.3, 0.0, H2, "", c="#2e7d32")
    ax.text(0.22, 4.65, "", fontsize=1)
    dim(ax, 1.5, 4.3, 1.5, H2, "1,0", c="#2e7d32")
    rect(ax, 0, 4.3, 0.07, 1.0, "#e91e8c", ec="none", z=7)
    txt(ax, 0.4, 5.1, "обои «Зебра»", 5, "#e91e8c", z=11)
    # стол проверки 1,0×0,6 у правой границы зала + розетка
    rect(ax, 4.2, 2.8, 0.6, 1.0, "white", ec="k", lw=1.3, z=7); txt(ax, 4.5, 3.3, "стол\nпроверки\n1×0,6", 5.5, rotation=90)
    txt(ax, 4.0, 3.95, "розетка 220 В", 5.5, "#b00020", ha="right")
    # левая колонка: стол приёма + стеллажи (как нарисовано)
    rect(ax, 0, H2 + 0.1, 0.55, 1.5, "white", ec="k", lw=1.2, z=7)
    ax.text(0.28, H2 + 0.85, "СТОЛ ПРИЁМА", fontsize=6.5, rotation=90, ha="center", va="center", zorder=11)
    for i in range(5):
        shelf(ax, 0, H2 + 1.6 + i * 0.52, 0.55, 0.52)
    rect(ax, 0.02, 9.55, 0.5, 1.5, "#fff3e0", ec="k", lw=1.0, z=7)
    ax.text(0.28, 10.3, "холод./витрина\n(по эскизу)", fontsize=5, rotation=90, ha="center", va="center", zorder=11)
    for i in range(4):
        shelf(ax, 1.6, 7.3 + i * 0.5, 0.5, 0.5)
    rect(ax, 1.55, 9.45, 0.5, 1.6, "#efebe9", ec="k", lw=1.0, z=7, ls="--")
    ax.text(1.8, 10.25, "паллет разборный", fontsize=6, rotation=90, ha="center", va="center", zorder=11)
    txt(ax, 1.05, 8.4, "проход\n1,05", 6, "#0b3d91")
    # карман: 2 ряда вдоль стен, остров убран → проход 1,6
    for i in range(5):
        shelf(ax, 4.3, 5.9 + i * 0.94, 0.5, 0.94, "100")
    for i in range(4):
        shelf(ax, 2.25, 7.3 + i * 0.82, 0.5, 0.82, "100")
    shelf(ax, 2.25, 5.4, 0.5, 0.9, "100")
    txt(ax, 3.5, 8.3, "проход 1,6", 7, "#0b3d91", rotation=90)
    txt(ax, 3.5, 5.75, "обои 2,70 (брендинг\nна стене кармана)", 6, "#e91e8c")
    rect(ax, 2.7, H2 - 0.04, 1.4, 0.08, "#e91e8c", ec="none", z=7)
    # камеры
    cams(ax, [(0.12, 2.6, "камера\nзал"), (HALL_W - 0.12, H2 - 0.15, "камера\nзал 2"), (0.1, H2 + 0.15, "камера склад"),
              (2.3, YB_A - 0.15, "камера\nсклад")])
    # зоны
    txt(ax, 2.9, 3.35, "ЗОНА РЕШЕНИЯ — свободно", 7, "#999")
    txt(ax, 1.05, 2.0, "вход, очередь", 7, "#999")
    area_cl = HALL_W * HALL_H + B * 2.5
    fig.text(0.02, 0.012, f"Клиентская зона: зал 13,4 + ниша B 6,75 = {area_cl:.1f} м² (≥ 20 ✓) · склад-зона 26,5 м² (≥ 20 ✓) · "
             "примерочных 2 ✓ · вход→стойка 3,7 м ✓ · проход оператора 1,0 м ✓", fontsize=8, color="#333")
    pdf.savefig(fig); fig.savefig(png, dpi=130); plt.close(fig)


if __name__ == "__main__":
    here = os.path.dirname(os.path.abspath(__file__))
    with PdfPages(os.path.join(here, "PVZ_544512_eskiz2_ekspert.pdf")) as pdf:
        page_as_drawn(pdf, os.path.join(here, "4_eskiz2_kak_narisovano.png"))
        page_review(pdf, os.path.join(here, "5_ekspertnaya_proverka.png"))
        page_fixed(pdf, os.path.join(here, "6_variant_G_rekomendacia.png"))
    print("ok")
