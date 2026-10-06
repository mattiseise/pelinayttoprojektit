using TMPro;
using UnityEngine;

public class KahviKokeilu : MonoBehaviour
{
    [SerializeField] private TMP_Text palaute;

    public void ValitseKahvi()
    {
        palaute.text = "Onnistui! Valitsit kahvin.";
    }
}
