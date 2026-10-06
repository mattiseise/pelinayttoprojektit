using TMPro;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    [SerializeField] private GameObject menuPanel;
    [SerializeField] private GameObject gamePanel;
    [SerializeField] private GameObject resultPanel;
    [SerializeField] private TMP_Text orderText;
    [SerializeField] private TMP_Text scoreText;
    [SerializeField] private TMP_Text finalScoreText;

    private int score;
    private bool coffeeSelected;

    private void Start()
    {
        ShowOnly(menuPanel);
    }

    public void StartGame()
    {
        score = 0;
        coffeeSelected = false;
        // TODO työvaihe 4: kirjoita orderText-kenttään "Asiakas tilaa: Kahvi"
        // TODO työvaihe 4: näytä pisteet scoreText-kentässä
        ShowOnly(gamePanel);
    }

    public void SelectCoffee()
    {
        coffeeSelected = true;
    }

    public void SubmitOrder()
    {
        // TODO työvaihe 4: jos coffeeSelected on true, lisää pisteisiin 10
        // TODO työvaihe 4: näytä uudet pisteet scoreText-kentässä
        EndGame(); // viikolla 38 peli päättyy vasta, kun aika loppuu
    }

    public void EndGame()
    {
        // TODO työvaihe 4: näytä pisteet finalScoreText-kentässä
        ShowOnly(resultPanel);
    }

    public void RestartGame()
    {
        StartGame();
    }

    private void ShowOnly(GameObject panel)
    {
        menuPanel.SetActive(panel == menuPanel);
        gamePanel.SetActive(panel == gamePanel);
        resultPanel.SetActive(panel == resultPanel);
    }
}