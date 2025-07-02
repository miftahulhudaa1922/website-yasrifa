// lib/pdf/PendaftarDocument.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  title: { fontSize: 16, marginBottom: 10, fontWeight: "bold" },
  section: { marginBottom: 10 },
  row: {
    flexDirection: "row",
    borderBottom: "1 solid #ccc",
    paddingVertical: 4,
  },
  col1: { width: "40%", fontWeight: "bold" },
  col2: { width: "60%" },
  photo: { width: 100, height: 120, marginBottom: 10 },
});

interface Props {
  data: any;
  imageBase64: string;
}

export default function PendaftarDocument({ data, imageBase64 }: Props) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Formulir Pendaftaran</Text>

        <View style={styles.section}>
          <Text style={{ marginBottom: 4 }}>Foto Pendaftar:</Text>
          {imageBase64 && <Image src={imageBase64} style={styles.photo} />}
        </View>

        <View style={styles.section}>
          <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
            Data Lengkap:
          </Text>
          {Object.entries(data).map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              return Object.entries(value).map(([subKey, subVal]) => (
                <View style={styles.row} key={`${key}-${subKey}`}>
                  <Text style={styles.col1}>
                    {key} - {subKey}
                  </Text>
                  <Text style={styles.col2}>{String(subVal)}</Text>
                </View>
              ));
            }
            return (
              <View style={styles.row} key={key}>
                <Text style={styles.col1}>{key}</Text>
                <Text style={styles.col2}>{String(value)}</Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}
