// js/utils/addToei.js

export const runAddToei = async () => {
    console.log("🚀 Adicionando Yu-Gi-Oh! (Toei Anime) ao banco de dados...");
    const SeriesClass = Parse.Object.extend("Series");

    try {
        const query = new Parse.Query(SeriesClass);
        query.equalTo("seriesId", "toeianime");
        const existing = await query.first();

        if (existing) {
            console.log("⚠️ A série Toei já existe no banco. Pulando...");
            return;
        }

        const parseSeries = new SeriesClass();
        parseSeries.set("seriesId", "toeianime"); // Para puxar o toeianime.png automaticamente
        parseSeries.set("name", "Yu-Gi-Oh! (Toei Anime)");
        parseSeries.set("order", 0); // Ordem 0 garante que venha ANTES do DM (que é 1)

        await parseSeries.save();
        console.log("✅ Sucesso: Yu-Gi-Oh! (Toei Anime) salvo no banco!");
        console.log("🎉 Agora você pode recarregar a página e deletar este script.");
    } catch (error) {
        console.error("❌ Erro ao salvar a série Toei:", error.message);
    }
};