import sys, io, cairosvg
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
D=sys.argv[1]; out=sys.argv[2]
w=PdfWriter()
for n in ('front','back'):
    pdf=cairosvg.svg2pdf(url=f'{D}/calendar-2027-{n}.svg')
    w.add_page(PdfReader(io.BytesIO(pdf)).pages[0])
mm=72/25.4
for p in w.pages:
    W=float(p.mediabox.width); H=float(p.mediabox.height)
    p.mediabox=RectangleObject([0,0,W,H]); p.bleedbox=RectangleObject([0,0,W,H])
    p.trimbox=RectangleObject([2*mm,2*mm,W-2*mm,H-2*mm])
w.add_metadata({'/Title':'Хочу на отдых — календарик 2027 (90×50 мм, вылет 2 мм)'})
w.write(out)
