from app.services.verifiers.address_match import is_address_name_match_with
from app.services.verifiers.address_presence import is_address_present
from app.services.verifiers.personal_address_info_presence import validate_document
# print(
#     is_address_name_match_with(
#         r"""Amit Mishra, S/O: Rajesh Kumar Mishra, b.2, 12 वी, TH RYDOB:
# 30/07/1995, vahani p.a.c., fatehpur, Fatehpur, वाहिनी पी.ए.सी., फतेहपुर, फरोहपुर, फतेहपुर,, पुरुष/ MALE, Fatehpur,, उत्तर         प्रदेश - 212601""",
#         r"""'भारत सरकार\nभारतीय विशिष्ट पहचान प्राधिकरण\nGovernment of India\nUnique Identification Authority of India\ \nअमित
# मिश्रा\nAddress:\nपता :\nAmit Mishra\nS/O: Rajesh Kumar Mishra, b.2, 12 v आत्मज: राजेश कुमार मिश्रा, बी.2, 12 वी\nTH RYDOB:
# 30/07/1995\nvahani p.a.c., fatehpur, Fatehpur,\nवाहिनी पी.ए.सी., फतेहपुर, फरोहपुर, फतेहपुर,\nपुरुष/ MALE\nFatehpur,\nउत्तर         प्रदेश -""",
#     )
# )

# is_address_name_match_with(
#     "Amit Mishra, S/O: Rajesh Kumar Mishra, b.2, 12 वी, TH RYDOB: 30/07/1995, vahani p.a.c., fatehpur, Fatehpur, वाहिनी पी.ए.सी., फतेहपुर, फरोहपुर, फतेहप"

# )


# info = is_address_present(
#     r"""Amit Mishra, S/O: Rajesh Kumar, वाहिनी पी.ए.सी., फतेहपुर, फरोहपुर, फतेहपुर,, पुरुष/ MALE, Fatehpur,, उत्तर         प्रदेश - 212601""",
#     document_type="id_proof",
# )
info = validate_document(
    r"""Amit Mishra, S/O: Rajesh Kumar, वाहिनी पी.ए.सी., फतेहपुर, फरोहपुर, फतेहपुर,, पुरुष/ MALE, Fatehpur,, उत्तर         प्रदेश - 212601""",
    document_type="id_proof",
)   


print("Info: ", info)
